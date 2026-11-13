import { When, Then, Given, After, DataTable } from '@cucumber/cucumber';
import axios, { AxiosResponse } from 'axios';
import expect from 'expect';
import { execSync } from 'child_process';
import { deepCompare } from '../_helper/deep-compare';

const apiBaseUrl = 'http://localhost:3000';
let apiToken: string | null = null;
let apiResponse: AxiosResponse;

Given('I use seed data', () => {
  execSync('npx prisma migrate reset --force > /dev/null');
  execSync('npx prisma db seed > /dev/null');
});

Given('I use admin token', async () => {
  apiToken = 'admin-token';
});

Given('I use destructive actions token', async () => {
  apiToken = 'destructive-actions-token';
});

When(
  'I send a {string} request to {string}',
  async (method: string, path: string) => {
    const url = `${apiBaseUrl}${path}`;
    apiResponse = await axios.request({
      method: method,
      url: url,
      validateStatus: () => true,
      headers: authorizationHeader(),
    });
  },
);

When(
  'I send a {string} request to {string} with body:',
  async (method: string, path: string, body: string) => {
    const url = `${apiBaseUrl}${path}`;
    apiResponse = await axios.request({
      method: method,
      url: url,
      data: JSON.parse(body),
      validateStatus: () => true,
      headers: authorizationHeader(),
    });
  },
);

Then('the response status should be {int}', (statusCode: number) => {
  expect(apiResponse.status).toBe(statusCode);
});

Then(
  'the response body should have the property {string}',
  (property: string) => {
    expect(apiResponse.data).toHaveProperty(property);
  },
);

Then('the response body should contain:', async function (docString: string) {
  const expected = JSON.parse(docString);
  const actual = apiResponse.data;

  deepCompare(actual, expected);
});

Then(
  'the response body should list the articles in this order:',
  (table: DataTable) => {
    const expectedIds = table.raw().map(([id]) => id);
    const actualIds = apiResponse.data.map(
      (article: { id: string }) => article.id,
    );

    expect(actualIds).toEqual(expectedIds);
  },
);

Then('I dump response', () => {
  console.log(JSON.stringify(apiResponse.data));
});

After(() => {
  apiToken = null;
});

Given('I use no token', () => {
  apiToken = null;
});

Given('I use a wrong token', () => {
  apiToken = 'wrong-token';
});

function authorizationHeader(): Record<string, string> {
  return apiToken === null ? {} : { Authorization: `Bearer ${apiToken}` };
}

Then(
  'the response body should include an article titled {string}',
  (title: string) => {
    const titles = apiResponse.data.map(
      (article: { title: string }) => article.title,
    );

    expect(titles).toContain(title);
  },
);
