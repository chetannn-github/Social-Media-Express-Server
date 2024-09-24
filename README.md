# API Documentation for Social Media Express Server

## Introduction
This documentation provides detailed information about the API endpoints for the social media server. The API is designed for interaction with users, posts, comments, likes, and messaging functionalities.

## Base URL
- **Base URL:** `https://api.yourdomain.com/v1/`

---


### 1. **Authentication API**

#### Endpoints:

# API Documentation

## 1. **Sign Up**
- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Registers a new user after validating input fields, ensuring the uniqueness of email and username. Passwords are hashed, a profile picture is generated, and a verification email is sent.

### Request Body:
```json
{
  "userName": "string",       // Unique username (lowercase, trimmed)
  "email": "string",          // Unique, valid email (max length 20, lowercase)
  "password": "string",       // Password (8-15 characters)
  "confirmPassword": "string",// Must match the password
  "fullName": "string",       // Required full name of the user
  "gender": "male | female"   // Gender of the user
}

    
```


## 2. **Log In**
   - **URL:** `/login`
   - **Method:** `POST`
   - **Description:** Logs in a user and returns a JWT token.
   - **Request Body:**
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "token": "string",
       "message": "Login successful"
     }
     ```

3. **Log Out**
   - **URL:** `/logout`
   - **Method:** `POST`
   - **Description:** Logs out the user.
   - **Response:**
     ```json
     {
       "message": "Logged out successfully."
     }
     ```

### 4. **Verify Email**
   - **URL:** `/verify-email`
   - **Method:** `POST`
   - **Description:** Verifies the user’s email using a verification code. Updates the user's verification status if valid; returns an error if invalid or expired.

   - **Request Body:**
     ```json
     {
       "code": "string"
     }
     ```

   - **Response:**
     - **Success:** User data including verification status.
     - **Error:** 
       - "Invalid or expired verificationToken"
       - "something went wrong in verification of user"

---

5. **Forgot Password**
   - **URL:** `/forgot-password`
   - **Method:** `POST`
   - **Description:** Sends a password reset link to the user's email.
   - **Request Body:**
     ```json
     {
       "email": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Password reset link sent to email."
     }
     ```

6. **Reset Password**
   - **URL:** `/reset-password/:token`
   - **Method:** `POST`
   - **Description:** Resets the user's password using a reset token.
   - **Request Body:**
     ```json
     {
       "newPassword": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Password reset successfully."
     }
     ```

---

### 2. **User API (Extended)**

#### Endpoints:

1. **Get Suggested Users**
   - **URL:** `/suggested`
   - **Method:** `GET`
   - **Description:** Retrieves a list of suggested users for the authenticated user.
   - **Response:**
     ```json
     [
       {
         "id": "uuid",
         "username": "string",
         "profilePic": "url"
       }
     ]
     ```

2. **Get User Profile**
   - **URL:** `/profile/{userName}`
   - **Method:** `GET`
   - **Description:** Retrieves the profile information of a specific user by username.
   - **Response:**
     ```json
     {
       "id": "uuid",
       "username": "string",
       "bio": "string",
       "posts": [/* array of posts */]
     }
     ```

3. **Freeze Account**
   - **URL:** `/freeze`
   - **Method:** `PATCH`
   - **Authentication:** Required
   - **Description:** Freezes the authenticated user’s account.
   - **Response:**
     ```json
     {
       "message": "Account frozen successfully."
     }
     ```

4. **Update User**
   - **URL:** `/update/{id}`
   - **Method:** `PATCH`
   - **Authentication:** Required
   - **Description:** Updates user profile information for the user with the given ID.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "bio": "string",
       "profilePic": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "User updated successfully."
     }
     ```

5. **Unfollow User**
   - **URL:** `/unfollow/{id}`
   - **Method:** `POST`
   - **Authentication:** Required
   - **Description:** Unfollows the user with the specified ID.
   - **Response:**
     ```json
     {
       "message": "Unfollowed user successfully."
     }
     ```

### 3. **Posts API (Extended)**

#### Endpoints:

1. **Get Feed Posts**
   - **URL:** `/feed`
   - **Method:** `GET`
   - **Description:** Retrieves a list of posts from users that the authenticated user is following, sorted by recent activity.
   - **Response:**
     ```json
     [
       {
         "id": "uuid",
         "content": "string",
         "author": {
           "id": "uuid",
           "username": "string"
         },
         "created_at": "timestamp",
         "likes": "number",
         "comments": "number"
       }
     ]
     ```

2. **Get Post by ID**
   - **URL:** `/{postId}`
   - **Method:** `GET`
   - **Description:** Retrieves details of a specific post by its ID.
   - **Response:**
     ```json
     {
       "id": "uuid",
       "content": "string",
       "author": {
         "id": "uuid",
         "username": "string"
       },
       "created_at": "timestamp",
       "likes": "number",
       "comments": [/* array of comments */]
     }
     ```

3. **Create Post**
   - **URL:** `/create`
   - **Method:** `POST`
   - **Description:** Creates a new post for the authenticated user.
   - **Request Body:**
     ```json
     {
       "content": "string",
       "image_url": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "id": "uuid",
       "message": "Post created successfully."
     }
     ```

4. **Create Comment**
   - **URL:** `/comment`
   - **Method:** `POST`
   - **Description:** Adds a comment to a post.
   - **Request Body:**
     ```json
     {
       "postId": "uuid",
       "comment": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "id": "uuid",
       "message": "Comment added successfully."
     }
     ```

5. **Like Post**
   - **URL:** `/like/{postId}`
   - **Method:** `PATCH`
   - **Description:** Likes a post with the given post ID.
   - **Response:**
     ```json
     {
       "postId": "uuid",
       "likes": "number",
       "message": "Post liked successfully."
     }
     ```

6. **Save Post**
   - **URL:** `/save/{postId}`
   - **Method:** `PATCH`
   - **Description:** Saves a post to the authenticated user's collection.
   - **Response:**
     ```json
     {
       "postId": "uuid",
       "message": "Post saved successfully."
     }
     ```

7. **Delete Post**
   - **URL:** `/delete/{postId}`
   - **Method:** `DELETE`
   - **Description:** Deletes the post with the given post ID.
   - **Response:**
     ```json
     {
       "message": "Post deleted successfully."
     }
     ```

---

### 4. **Follow Requests API**

#### Endpoints:

1. **Get All Follow Requests**
   - **URL:** `/`
   - **Method:** `GET`
   - **Description:** Retrieves all follow requests for the authenticated user.
   - **Response:**
     ```json
     [
       {
         "requestId": "uuid",
         "senderId": "uuid",
         "senderUsername": "string",
         "status": "pending"
       }
     ]
     ```

2. **Send Follow Request**
   - **URL:** `/send`
   - **Method:** `POST`
   - **Description:** Sends a follow request to another user.
   - **Request Body:**
     ```json
     {
       "receiverId": "uuid"
     }
     ```
   - **Response:**
     ```json
     {
       "requestId": "uuid",
       "message": "Follow request sent successfully."
     }
     ```

3. **Accept Follow Request**
   - **URL:** `/accept`
   - **Method:** `POST`
   - **Description:** Accepts a follow request.
   - **Request Body:**
     ```json
     {
       "requestId": "uuid"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Follow request accepted."
     }
     ```

4. **Reject Follow Request**
   - **URL:** `/reject`
   - **Method:** `POST`
   - **Description:** Rejects a follow request.
   - **Request Body:**
     ```json
     {
       "requestId": "uuid"
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Follow request rejected."
     }
     ```


### 5. **Notifications API**

#### Endpoints:

1. **Get All Notifications**
   - **URL:** `/`
   - **Method:** `GET`
   - **Description:** Retrieves all notifications for the authenticated user.
   - **Response:**
     ```json
     [
       {
         "notificationId": "uuid",
         "message": "string",
         "read": "boolean",
         "created_at": "timestamp"
       }
     ]
     ```

2. **Mark All Notifications as Read**
   - **URL:** `/`
   - **Method:** `PATCH`
   - **Description:** Marks all notifications as read for the authenticated user.
   - **Response:**
     ```json
     {
       "message": "All notifications marked as read."
     }
     ```

3. **Delete All Notifications**
   - **URL:** `/`
   - **Method:** `DELETE`
   - **Description:** Deletes all notifications for the authenticated user.
   - **Response:**
     ```json
     {
       "message": "All notifications deleted successfully."
     }
     ```

---

### 6. **Chat API**

#### Endpoints:

1. **Send Message**
   - **URL:** `/message`
   - **Method:** `POST`
   - **Description:** Sends a message to a user.
   - **Request Body:**
     ```json
     {
       "receiverId": "uuid",
       "message": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "messageId": "uuid",
       "message": "Message sent successfully."
     }
     ```

2. **Get All Messages with a User**
   - **URL:** `/{receiverId}`
   - **Method:** `GET`
   - **Description:** Retrieves all messages exchanged between the authenticated user and a specified user (receiverId).
   - **Response:**
     ```json
     [
       {
         "messageId": "uuid",
         "senderId": "uuid",
         "receiverId": "uuid",
         "message": "string",
         "created_at": "timestamp"
       }
     ]
     ```

3. **Get All Conversations**
   - **URL:** `/`
   - **Method:** `GET`
   - **Description:** Retrieves a list of all conversations the authenticated user is part of.
   - **Response:**
     ```json
     [
       {
         "conversationId": "uuid",
         "lastMessage": "string",
         "lastMessageTime": "timestamp",
         "participants": [
           {
             "userId": "uuid",
             "username": "string"
           }
         ]
       }
     ]
     ```

