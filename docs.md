## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `GET /calculate/:username`
- `GET /user`
- `POST /match/:userId`

### POST /register

#### Description

- Create a new user data

#### Request

- Body
  ```json
  {
    "username": String,
    "email": String,
    "password": String,
    "fullname": String,
    "gender": String,
    "birthyear": Integer,
    "location": String,
    "imgUrl": String,
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": "Register Success",
    "id": Integer,
    "username": String,
    "email": String,
    "location": String,
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "message": String
  }
  ```

### POST /login

#### Description

- Create a new user data

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "access_token": String
  }

  ```

  _401 - Invalid Input_

- Body

  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

`Success Login will send us an access_token that will get authentication which will check that the access_token is correct or not.`
`When the access_token is wrong or do not match with the verification result, it will send an error response`

_401 - Invalid Token_

- Body

  ```json
  {
    "statusCode": 401,
    "message": String
  }
  ```

### GET /user

#### Description

- Get all user data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  [
    {
    "username":String,
    "email":String,
    "password":String,
    "fullname":String,
    "gender":String,
    "birthyear":Integer,
    "location":String,
    "imgUrl":String
    }
  ]
  ```

### GET /calculate/:username

#### Description

- Get love calculator data by username

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "fname":String,
    "sname":String,
    "percentage":String,
    "result":String,
  }
  ```

### POST /match/:userId`

#### Description

- Create match data by userId

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    "UserId": Integer,
    "MatchId": Integer,
    "status": String
    }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "statusCode": 400,
    "message": String
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "message": "Internal Server Error"
  }
  ```
