Feature: As the author I can delete my blog articles

  Scenario: As the author I can delete an article, and reading it afterwards gives 404
    Given I use seed data
    And I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004"
    Then the response status should be 204
    When I send a "GET" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004"
    Then the response status should be 404

  Scenario: As the author I cannot delete an article that does not exist
    Given I use seed data
    And I use admin token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-9999-4000-8000-000000000999"
    Then the response status should be 404

  Scenario: As the author I cannot delete an article with an ID that is not valid
    Given I use admin token
    When I send a "DELETE" request to "/api/v1/articles/not-a-valid-id"
    Then the response status should be 400

  Scenario: As a stranger without a token I cannot delete an article
    Given I use seed data
    And I use no token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004"
    Then the response status should be 401

  Scenario: As a stranger with a wrong token I cannot delete an article
    Given I use seed data
    And I use a wrong token
    When I send a "DELETE" request to "/api/v1/articles/5e1f0a2b-0004-4000-8000-000000000004"
    Then the response status should be 403

  Scenario: As a stranger without a token I learn nothing when I delete with an invalid ID
    Given I use no token
    When I send a "DELETE" request to "/api/v1/articles/not-a-valid-id"
    Then the response status should be 401
