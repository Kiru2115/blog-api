# Blog API

Back end of my personal blog, built with Nest.js, Prisma and PostgreSQL.

## Tech stack

| Technology | Version |
| ---------- | ------- |
| Node.js    | 24      |
| TypeScript | 5.8     |
| Nest.js    | 11      |
| Prisma     | 7       |
| PostgreSQL | 16      |

## Requirements

- Docker with Docker Compose
- Git
- On Windows: WSL 2, with the repository kept inside the WSL file system

You do not need Node.js on your machine. Everything runs in containers.

## Getting started

1. Clone the repository:

    ```shell
    git clone https://github.com/Kiru2115/blog-api.git
    cd blog-api
    ```

2. Create the environment file:

    ```shell
    cp .env.dist .env
    ```

3. Start the containers:

    ```shell
    docker compose up -d --build --wait
    ```

    On every start the app installs packages, generates the Prisma client,
    applies migrations, seeds the database and starts Nest.js in watch mode.

4. Check that it works:
    - http://localhost/ returns the status and version
    - http://localhost/api shows the Swagger documentation

To see the logs, run:

```shell
docker compose logs -f app
```

## Running checks

Run `npm`, `npx` and `node` only inside the app container, never on your machine:

```shell
docker compose exec app npm run format
docker compose exec app npm run lint
docker compose exec app npm run test:functional
```

## Versioning

The version lives in `package.json` and follows semver. Bump it in every pull request:
minor for features, patch for fixes. Every merge to `main` creates a git tag and a GitHub release.

## Troubleshooting

- `Port is already allocated` for 80 or 5432: another program uses that port,
  often a local PostgreSQL or another Docker project.
- The app does not start: check `docker compose logs app`.
