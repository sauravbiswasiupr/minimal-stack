README
******

An implementation of a very basic stack. The app object is the entry point of your application. The app object has several modules that one can define and instantiate. Two modules are there by default. Namely:

1. server: This module accepts HTTP/ HTTPS requests to certain routes / APIs that you define and sends responses back, after they have been processed by your backend logic.

2. db: A module that provides connection to PostgreSQL database via knex. This module can be used to perform DB related operations.

Other modules can be added as per the backend logic. The modules must have their dependencies properly defined for them to start and stop gracefully. 
