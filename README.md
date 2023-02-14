## Description

API created for conexa's challenge.

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ nest start login-ms

$ nest start business-ms

```

## Testing

```bash
$ npm run test

```

## Endpoints

```bash
{
    "description": "Creates a new user"
    "url": "http://localhost:3001/login/register",
    "method": "POST",
    "body": {
        {
        "mail": "string",
        "password": "string"
        }
    },
    "response" : {
      "data": {
        {
        "mail": "string",
        "password": "string"
        }
      },
      "errorMessage": "string",
      "statusCode" : "number"
    }
},
{
    "description": "Validate the user's credentials and return a token"
    "url": "http://localhost:3001/login",
    "method": "POST",
    "body": {
        {
        "mail": "string",
        "password": "string"
        }
    },
    "response" : {
      "data": {
        {
          "token": "string",
        }
      },
      "errorMessage": "string",
      "statusCode" : "number"
    }
},
{
    "description": "Get a list of user"
    "url": "http://localhost:3001/login/users?page=?&limit=?&search=?",
    "method": "GET",
    "paramethers": {
      "page": "number",
      "limit": "number",
      "search": "string" | null
    }
    "response" : {
      "data": {
        {
        "mail": "string",
        "password": "string"
        }
      },
      "errorMessage": "string",
      "statusCode" : "number"
    }
}
```
