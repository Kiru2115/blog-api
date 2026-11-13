Feature: As a visitor I can list the blog articles

  Scenario: As a visitor I can see every article, newest first
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      [
        {
          "id": "5e1f0a2b-0003-4000-8000-000000000003",
          "title": "What I learned at the CyberSkiller final",
          "content": "Notes from the final of CyberSkiller, a nationwide cybersecurity competition held at Kozminski University.",
          "publishedAt": "2026-11-10T12:00:00.000Z"
        },
        {
          "id": "5e1f0a2b-0004-4000-8000-000000000004",
          "title": "My first Nest.js API",
          "content": "How I built the API of this blog with Nest.js, Prisma and PostgreSQL, step by step.",
          "publishedAt": "2026-11-10T12:00:00.000Z"
        },
        {
          "id": "5e1f0a2b-0002-4000-8000-000000000002",
          "title": "Setting up WSL, Docker and Git on Windows",
          "content": "How I set up my machine for web development: WSL 2 with Ubuntu, Docker Desktop and signed Git commits.",
          "publishedAt": "2026-11-05T18:30:00.000Z"
        },
        {
          "id": "5e1f0a2b-0001-4000-8000-000000000001",
          "title": "Hello, world: why I am starting this blog",
          "content": "This is the first article on my blog. I want to write about what I learn as a developer intern.",
          "publishedAt": "2026-11-01T09:00:00.000Z"
        }
      ]
      """

  Scenario: As a visitor I see articles published at the same moment in the same order on every call
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles"
    Then the response body should list the articles in this order:
      | 5e1f0a2b-0003-4000-8000-000000000003 |
      | 5e1f0a2b-0004-4000-8000-000000000004 |
      | 5e1f0a2b-0002-4000-8000-000000000002 |
      | 5e1f0a2b-0001-4000-8000-000000000001 |
    When I send a "GET" request to "/api/v1/articles"
    Then the response body should list the articles in this order:
      | 5e1f0a2b-0003-4000-8000-000000000003 |
      | 5e1f0a2b-0004-4000-8000-000000000004 |
      | 5e1f0a2b-0002-4000-8000-000000000002 |
      | 5e1f0a2b-0001-4000-8000-000000000001 |
    When I send a "GET" request to "/api/v1/articles"
    Then the response body should list the articles in this order:
      | 5e1f0a2b-0003-4000-8000-000000000003 |
      | 5e1f0a2b-0004-4000-8000-000000000004 |
      | 5e1f0a2b-0002-4000-8000-000000000002 |
      | 5e1f0a2b-0001-4000-8000-000000000001 |

  Scenario: As a visitor I see an empty list when there are no articles
    Given there are no articles
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should contain:
      """
      []
      """

  Scenario: As a visitor I see every seed article only once after the app has started several times
    Given I use seed data
    And the database start-up steps have run 3 times
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    And the response body should list the articles in this order:
      | 5e1f0a2b-0003-4000-8000-000000000003 |
      | 5e1f0a2b-0004-4000-8000-000000000004 |
      | 5e1f0a2b-0002-4000-8000-000000000002 |
      | 5e1f0a2b-0001-4000-8000-000000000001 |

  Scenario: As a visitor without a token I can still read the articles
    Given I use seed data
    And I use no token
    When I send a "GET" request to "/api/v1/articles"
    Then the response status should be 200
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0001-4000-8000-000000000001"
    Then the response status should be 200
