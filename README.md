# POST /signup

## Request Body
- `userName`: `string` (required)
- `password`: `string` (required)
- `email`: `string` (required)
- `confirmPassword`: `string` (required)
- `gender`: `string` (required)
- `fullName`: `string` (required)

## Response

### 201 Created
- **Description**: User account created successfully.

### 400 Bad Request
- **Description**: Error creating user account.
- **Response Body**:
  ```json
  {
    "error": "string" // error message
  }

Response Example
```json
{
  "user": {
    "_id": "ObjectId",
    "userName": "johnDoe",
    "email": "johndoe@example.com",
    "fullName": "John Doe",
    "gender": "male",
    "profilePic": "https://avatar.iran.liara.run/public/boy?username=johnDoe"
  }
}

###Error examples 
Error Examples
"Please fill all the fields!!"
"password and confirmPassword do not match!!"
"email is not valid"
"Email already in use !!"
"username already exists !!"
"something went wrong in signup route"

