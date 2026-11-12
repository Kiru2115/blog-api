Feature: As the author I can create blog articles

  Scenario: As the author I can create an article, and it shows up in the list
    Given I use seed data
    And I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My second article",
        "content": "This article was written through the API."
      }
      """
    Then the response status should be 201
    And the response body should contain:
      """
      {
        "id": "@uuid",
        "title": "My second article",
        "content": "This article was written through the API.",
        "publishedAt": "@date('within 1 minute from now')"
      }
      """
    When I send a "GET" request to "/api/v1/articles"
    Then the response body should include an article titled "My second article"

  Scenario: As the author I get a violation on each field that breaks a rule
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "Hi",
        "content": "   "
      }
      """
    Then the response status should be 400
    And the response body should have the property "violations.title"
    And the response body should have the property "violations.content"

  Scenario: As the author I cannot set the fields the server owns
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "id": "5e1f0a2b-0005-4000-8000-000000000005",
        "title": "My second article",
        "content": "This article was written through the API.",
        "publishedAt": "2020-01-01T00:00:00.000Z"
      }
      """
    Then the response status should be 400
    And the response body should have the property "violations.id"
    And the response body should have the property "violations.publishedAt"

  Scenario: As the author I cannot send fields the API does not know
    Given I use admin token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My second article",
        "content": "This article was written through the API.",
        "author": "Alan"
      }
      """
    Then the response status should be 400
    And the response body should have the property "violations.author"

  Scenario: As a stranger without a token I cannot create an article
    Given I use no token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My second article",
        "content": "This article was written through the API."
      }
      """
    Then the response status should be 401

  Scenario: As a stranger with a wrong token I cannot create an article
    Given I use a wrong token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "My second article",
        "content": "This article was written through the API."
      }
      """
    Then the response status should be 403

  Scenario: As a stranger without a token I learn nothing about the rules from invalid data
    Given I use no token
    When I send a "POST" request to "/api/v1/articles" with body:
      """
      {
        "title": "Hi"
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
