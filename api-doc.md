# Yalaw forum

## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`

- `GET /thread/tech`
- `GET /thread/:id`

- `GET /`

&nbsp;

## 1. POST /user/register

Request:

- body:

```json
{
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST user/login

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "username": "string",
  "name": "string",
  "fullName": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /

Description:

- Get all data for landing page

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "message": "Successfully read data",
    "data": [
        {
            "id": 1,
            "title": "Hot Take: The Bends is Radiohead's most influential album",
            "content": "I KNOW I KNOW... just hear me out. I'm not claiming that The Bends is the most complex album nor the most experimental one, I'm claiming that The Bends was the one that inspired other bands the most.A whole new genre of popular bands got big inspiration from The Bends in the post-britpop movement. ",
            "imgUrl": "",
            "UserId": 1,
            "CategoryId": 1,
            "createdAt": "2022-09-14T12:05:26.361Z",
            "updatedAt": "2022-09-14T12:05:26.361Z",
            "User": {
                "id": 1,
                "username": "user1",
                "firstName": "Nabiel",
                "lastName": "Alif",
                "password": "$2b$10$6/Z56ZhJvR88EiTzYsfD9ufHH/jv/PJom1o7rXk8v.OOD6UWpDI3i",
                "createdAt": "2022-09-14T12:05:26.170Z",
                "updatedAt": "2022-09-14T12:05:26.170Z"
            }
        },
  },
]
```

&nbsp;

## 4. GET /thread/tech

Description:

- Get tech thread

Request:

- headers:

```json
{
  "X-Api-Key": "8e30a36e57414f8f8aa49b4442b16121"
}
```

_Response (200 - OK)_

```json


{
    "statusCode": 200,
    "message": "Successfully read data",
    "data": {
        "status": "ok",
        "totalResults": 10,
        "articles": [
            {
                "source": {
                    "id": "techcrunch",
                    "name": "TechCrunch"
                },
                "author": "Amanda Silberling",
                "title": "Zoom is experiencing a major outage",
                "description": "Users lost the ability to join meetings on Thursday morning.",
                "url": "https://techcrunch.com/2022/09/15/zoom-is-experiencing-a-major-outage/",
                "urlToImage": "https://techcrunch.com/wp-content/uploads/2020/09/zoom-glitch2.jpg?resize=1200,674",
                "publishedAt": "2022-09-15T15:34:27Z",
                "content": "If you had a meeting you really didn’t want to attend this morning, it’s your lucky day. Zoom’s status website shows that there is a major outage, affecting users’ ability to join meetings. According… [+797 chars]"
            },

```

&nbsp;

## 5. GET /thread/:id

Description:

- Get thread by id

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "statusCode": 200,
  "message": "Successfully read data",
  "data": {
    "id": 2,
    "title": "He's in the deepest ocean, the bottom of the sea",
    "content": "Thom yorke at the bottom of the sea",
    "imgUrl": "https://i.redd.it/etponhdr9on91.png",
    "UserId": 1,
    "CategoryId": 1,
    "createdAt": "2022-09-14T12:05:26.361Z",
    "updatedAt": "2022-09-14T12:05:26.361Z",
    "User": {
      "id": 1,
      "username": "user1",
      "firstName": "Nabiel",
      "lastName": "Alif"
    }
  }
}
```
