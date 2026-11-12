Feature: As a visitor I can read one blog article

  Scenario: As a visitor I can read the whole article
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004"
    Then the response status should be 200
    And the response body should contain:
      """
      {
        "id": "5e1f0a2b-0004-4000-8000-000000000004",
        "title": "My first Nest.js API",
        "content": "How I built the API of this blog with Nest.js, Prisma and PostgreSQL, step by step.",
        "publishedAt": "2026-11-10T12:00:00.000Z"
      }
      """

  Scenario: As a visitor I cannot read an article that does not exist
    Given I use seed data
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-9999-4000-8000-000000000999"
    Then the response status should be 404
    And the response body should contain:
      """
      {
        "statusCode": 404,
        "error": "Not Found",
        "message": "Article with ID 5e1f0a2b-9999-4000-8000-000000000999 does not exist."
      }
      """

  Scenario: As a visitor I cannot read an article with an ID that is not valid
    When I send a "GET" request to "/api/v1/articles/not-a-valid-id"
    Then the response status should be 400
    And the response body should contain:
      """
      {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "Validation failed (uuid v 4 is expected)"
      }
      """
