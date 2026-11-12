Feature: As the author I can edit my blog articles

  Scenario: As the author I can edit an article, and its publication date stays the same
    Given I use seed data
    And I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004" with body:
      """
      {
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints."
      }
      """
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "5e1f0a2b-0004-4000-8000-000000000004",
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints.",
        "publishedAt": "2026-11-10T12:00:00.000Z"
      }
      """
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004"
    Then the response body should contain:
      """
      {
        "id": "5e1f0a2b-0004-4000-8000-000000000004",
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints.",
        "publishedAt": "2026-11-10T12:00:00.000Z"
      }
      """

  Scenario: As the author I get a violation on each field that breaks a rule when I edit
    Given I use seed data
    And I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004" with body:
      """
      {
        "title": "",
        "content": "Too short"
      }
      """
    Then the response status should be 400
    And the response body should have the property "violations.title"
    And the response body should have the property "violations.content"

  Scenario: As the author I cannot edit the fields the server owns or add unknown ones
    Given I use seed data
    And I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004" with body:
      """
      {
        "id": "5e1f0a2b-0005-4000-8000-000000000005",
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints.",
        "publishedAt": "2020-01-01T00:00:00.000Z",
        "author": "Alan"
      }
      """
    Then the response status should be 400
    And the response body should have the property "violations.id"
    And the response body should have the property "violations.publishedAt"
    And the response body should have the property "violations.author"

  Scenario: As the author I cannot edit an article that does not exist
    Given I use seed data
    And I use admin token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-9999-4000-8000-000000000999" with body:
      """
      {
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints."
      }
      """
    Then the response status should be 404

  Scenario: As the author I cannot edit an article with an ID that is not valid
    Given I use admin token
    When I send a "PUT" request to "/api/v1/articles/not-a-valid-id" with body:
      """
      {
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints."
      }
      """
    Then the response status should be 400

  Scenario: As a stranger without a token I cannot edit an article
    Given I use no token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004" with body:
      """
      {
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints."
      }
      """
    Then the response status should be 401

  Scenario: As a stranger with a wrong token I cannot edit an article
    Given I use a wrong token
    When I send a "PUT" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004" with body:
      """
      {
        "title": "My first Nest.js API, updated",
        "content": "How I built the API of this blog, now with write endpoints."
      }
      """
    Then the response status should be 403

  Scenario: As a stranger without a token I learn nothing about the rules when I edit with invalid data
    Given I use no token
    When I send a "PUT" request to "/api/v1/articles/not-a-valid-id" with body:
      """
      {
        "title": ""
      }
      """
    Then the response status should be 401
    And the response body should contain:
      """
      {
        "message": "Unauthorized",
        "statusCode": 401
      }
      """
