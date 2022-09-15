 Hacktiv Course API Documentation

### Deployed server
- https://phase2-livecode2-1st.herokuapp.com/
- https://phase2-livecode2-2nd.herokuapp.com/


## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /regprofile`
- `POST /login`
- `POST /loginGoogle`
- `GET /nearby`


## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
    "message": "User has been created",
    "UserId": "integer"
}
```

## 2. POST /reprofile

Request:

- body:

```json
{
  "fullname": "string",
  "bio": "string",
  "imgUrl": "string",
  "UserId": "integer"
}
```

_Response (201 - OK)_

```json
{
    "message": "User has been created",
}
```


## 3. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "username": "string"
}
```


## 4. GET /nearby

Description:
- Get all nearby coffee shop from api google

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "Location": {"lat": "integer", "lng": "integer"},
    "name": "strings",
    "rating": "string",
    "address": "string",
  },
]
```