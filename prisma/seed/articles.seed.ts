import type { Prisma } from '../client/client';

export const articles: Prisma.ArticleCreateInput[] = [
  {
    id: '5e1f0a2b-0001-4000-8000-000000000001',
    title: 'Hello, world: why I am starting this blog',
    content:
      'This is the first article on my blog. I want to write about what I learn as a developer intern.',
    publishedAt: new Date('2026-11-01T09:00:00.000Z'),
  },
  {
    id: '5e1f0a2b-0002-4000-8000-000000000002',
    title: 'Setting up WSL, Docker and Git on Windows',
    content:
      'How I set up my machine for web development: WSL 2 with Ubuntu, Docker Desktop and signed Git commits.',
    publishedAt: new Date('2026-11-05T18:30:00.000Z'),
  },
  // Inserted before article 3 on purpose: both have the same publishedAt,
  // so only sorting by id as well gives the same order on every call.
  {
    id: '5e1f0a2b-0004-4000-8000-000000000004',
    title: 'My first Nest.js API',
    content:
      'How I built the API of this blog with Nest.js, Prisma and PostgreSQL, step by step.',
    publishedAt: new Date('2026-11-10T12:00:00.000Z'),
  },
  {
    id: '5e1f0a2b-0003-4000-8000-000000000003',
    title: 'What I learned at the CyberSkiller final',
    content:
      'Notes from the final of CyberSkiller, a nationwide cybersecurity competition held at Kozminski University.',
    publishedAt: new Date('2026-11-10T12:00:00.000Z'),
  },
];
