## Introduction.
This is a API application that allows customers to search for different plans depending on their zip code. Additionally, this API contains
different services to manage plans, zip codes and prices.

## Features.
* Create, Read, Update and Delete plans.
* Create, Read, Update and Delete zip codes.
* Create, Read, Update and Delete prices.
* Session management using Google autentication method.

## Technologies Used.
* **Nest.js:** A Node.js framework for building scalable and efficient web applications on the server.
* **TypeScript:** A programming language based on JavaScript that adds static types and other advanced features.
* **MongoDB:** A NoSQL document database used for efficient data storage and retrieval.
* **Mongoose:**  A MongoDB object modeling library for Node.js that provides a straightforward, schema-based solution to working with MongoDB.
* **Passport with Google:** A middleware for Node.js that provides authentication and authorization for Google accounts.
* **Jest:** A testing framework for JavaScript that focuses on simplicity and ease of use.

## Getting Started.
To run the API locally, run the following commands.

```bash
npm install

npm run start:dev
```

Additionally, be sure that you have added the **.env** file necessary to run this API.

Open [http://localhost:4000/health](http://localhost:4000/health) with your browser to see the result.