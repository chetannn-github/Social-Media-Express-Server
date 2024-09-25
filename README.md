# API Documentation for Social Media Express Server

## Introduction
This documentation provides detailed information about the API endpoints for the social media server. The API is designed for interaction with users, posts, comments, likes, and messaging functionalities.

## Base URL
- **Base URL:** `https://api.yourdomain.com/v1/`

---


## 1. **Authentication API**

#### Endpoints:

# API Documentation

### 1. **Sign Up**
- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user after validating input fields, ensuring the uniqueness of email and username. Passwords are hashed, a profile picture is generated, and a verification email is sent.


---

### Request Body Parameters

| Parameter         | Type    | Description                                         | Required |
|-------------------|---------|-----------------------------------------------------|----------|
| `userName`        | String  | Unique username, must be lowercase and trimmed      | Yes      |
| `password`        | String  | User's password (8-15 characters, trimmed)          | Yes      |
| `confirmPassword` | String  | Should match the `password` field                   | Yes      |
| `email`           | String  | User's email address, must be valid and unique      | Yes      |
| `gender`          | String  | Gender of the user (`male` or `female`)             | Yes      |
| `fullName`        | String  | Full name of the user, trimmed                      | Yes      |

---

### Response
```json
{
  "user": {
    "_id": "USER_ID",
    "email": "user@example.com",
    "userName": "username",
    "fullName": "User FullName",
    "gender": "male / female",
    "profilePic": "ProfilePicURL",
    "bio":"",
    "isVerified": false,
    "followers": [],
    "followings": [],
    "posts": [],
    "likedPosts": [],
    "savedPosts": [],
    "isFrozen":false,
    "isVerified":false,
  }
}

    
```


### 2. **Log In**
   - **URL:** `api/auth/login`
   - **Method:** `POST`
   - **Description:** Logs in a user and returns a JWT token.
   ---

### Request Body Parameters

| Parameter  | Type   | Description                             | Required |
|------------|--------|-----------------------------------------|----------|
| `userName` | String | The username of the user, lowercase      | Yes      |
| `password` | String | The password of the user (8-15 characters)| Yes      |

---

   ### Response
```json
{
  "user": {
    "_id": "USER_ID",
    "email": "user@example.com",
    "userName": "username",
    "fullName": "User FullName",
    "gender": "male/female",
    "profilePic": "ProfilePicURL",
    "isVerified": "false / true",
    "isFrozen":"false / true",
    "bio":"",
    "followers": [],
    "followings": [],
    "posts": [],
    "likedPosts": [],
    "savedPosts": []
  }
}

    
```

### 3. **Log Out**
   - **URL:** `api/auth/logout`
   - **Method:** `POST`
   - **Description:** Logs out the user.
   - **Response:**
     ```json
     {
       "message": "Logged out successfully."
     }
     ```

### 4. **Verify Email**
   - **URL:** `/api/auth/verify-email`
   - **Method:** `POST`
   - **Description:** Verifies the user’s email using a verification code. Updates the user's verification status if valid; returns an error if invalid or expired.

   ---

### Request Body Parameters

| Parameter | Type   | Description                                         | Required |
|-----------|--------|-----------------------------------------------------|----------|
| `code`    | String | The verification token sent to the user's email     | Yes      |

---

   - **Response:**
     - **Success:** User data including verification status.
     - **Error:** 
       - "Invalid or expired verificationToken"
       - "something went wrong in verification of user"

---

### 5. **Forgot Password**
   - **URL:** `api/auth/forgot-password`
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

### 6. **Reset Password**
   - **URL:** `api/auth/reset-password/:token`
   - **Method:** `POST`
   - **Description:** Resets the user's password using a reset token.
   ---
   ### Request Parameters

  | Parameter | Type   | Description                              | Required |
  |-----------|--------|------------------------------------------|----------|
  | `token`   | String | The password reset token provided to the user | Yes      |

---

  ### Request Body Parameters

  | Parameter  | Type   | Description                             | Required |
  |------------|--------|-----------------------------------------|----------|
  | `password` | String | The new password for the user (8-15 characters) | Yes      |

---

   - **Response:**
     ```json
     {
       "message": "Password reset successfully."
     }
     ```

---

## 2. **User API**

#### Endpoints:

### 1. **Get Suggested Users**
   - **URL:** `/api/user/suggested`
   - **Method:** `GET`
   - **Description:** Retrieves a list of users that the logged-in user does not follow.
   - **Response:**
     ```json
      [
        {
            "_id": "userId1",
            "userName": "username1",
            "email": "email1@example.com",
            "profilePic": "URL to profile picture",
            // other public fields...
        },
        {
            "_id": "userId2",
            "userName": "username2",
            "email": "email2@example.com",
            "profilePic": "URL to profile picture",
            // other public fields...
        }
        // other suggested users...
      ]
     ```

### 2. **Get User Profile**
   - **URL:** `/api/user/profile/{userName}`
   - **Method:** `GET`
   - **Description:** This controller fetches a user's profile based on their `userName`. It distinguishes between the logged-in user and other users, returning appropriate profile information while ensuring that sensitive fields are excluded.
   - **Response:**
     ```json
      {
        "userName": "exampleUser",
        "email": "example@example.com",
        "posts": [...],
        "likedPosts": [...],
        "savedPosts": [...],
        // Other user details
      }
  
     ```

### 3. **Freeze Account**
   - **URL:** `/api/user/freeze`
   - **Method:** `PATCH`
   - **Description:** Freezes the authenticated user’s account.
   - **Response:**
     ```json
     {
       "message": "Account frozen successfully."
     }
     ```

### 4. **Update User**
   - **URL:** `/api/user/update/{id}`
   - **Method:** `PATCH`
   - **Authentication:** Required
   - **Description:** Updates user profile information for the user with the given ID.
   ---

### Request Body Parameters

| Parameter  | Type   | Description                                     | Required |
|------------|--------|-------------------------------------------------|----------|
| `userName` | String | The new username for the user (if updating).   | No       |
| `password` | String | The new password for the user (if updating).    | No       |
| `fullName` | String | The full name of the user (if updating).        | No       |
| `bio`      | String | A short biography of the user (if updating).     | No       |

---

- **Response**
    ```json
      {
          "_id": "user_id",
          "userName": "newUserName",
          "fullName": "New Full Name",
          "bio": "Updated bio",
          "posts": [...],
          "likedPosts": [...],
          "savedPosts": [...],
          // Other user details
      }
    ```

### 5. **Unfollow User**
   - **URL:** `/api/user/unfollow/{id}`
   - **Method:** `POST`
   - **Authentication:** Required
   - **Description:** Unfollows the user with the specified ID.
   - **Response:**
      ```json
        {
        "message": "User unfollowed successfully",
        "user": {
          "_id": "user_id",
          "userName": "updatedUserName",
          "fullName": "Updated Full Name",
          "bio": "Updated bio",
          "followings": [...],
          "followers": [...],
          // Other user details
          }
        }
      ```

## 3. **Posts API**

#### Endpoints:

### 1. **Get Feed Posts**
   - **URL:** `/api/post/feed`
   - **Method:** `GET`
   - **Description:** Retrieves all posts made by the current user and their followers.
   - **Response:**
     ```json
      { 
        "posts": [
            {
                "_id": "postId",
                "caption": "Post caption",
                "photoURL": "URL to post image",
                "owner": "userId",
                "likes": ["userId1", "userId2", ...],
                "comments": [
                    {
                        "userId": "userId",
                        "text": "Comment text",
                        "userProfilePic": "URL to user's profile pic",
                        "userName": "User's name",
                        "createdAt": "timestamp"
                    },
                    // other comments...
                ],
                "createdAt": "timestamp",
                "updatedAt": "timestamp"
            },
            // other posts...
        ]
      }
     ```

### 2. **Get Post by ID**
   - **URL:** `/api/post/{postId}`
   - **Method:** `GET`
   - **Description:** Retrieves details of a specific post by its ID.
   - **Response:**
     ```json
      {
        "post": {
            "_id": "postId",
            "caption": "Post caption",
            "photoURL": "URL to post image",
            "owner": "userId",
            "likes": ["userId1", "userId2", ...],
            "comments": [
                {
                    "userId": "userId",
                    "text": "Comment text",
                    "userProfilePic": "URL to user's profile pic",
                    "userName": "User's name",
                    "createdAt": "timestamp"
                },
                // other comments...
            ],
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
      }
     ```

### 3. **Create Post**
   - **URL:** `/api/post/create`
   - **Method:** `POST`
   - **Description:** Creates a new post for the authenticated user.
   ---

## Request Body Parameters

| Parameter   | Type   | Description                                  | Required |
|-------------|--------|----------------------------------------------|----------|
| `caption`   | String | The text caption for the post (max 300 characters) | Yes      |
| `postedBy`  | String | The ID of the user creating the post         | Yes      |
| `image`     | String | (Optional) Buffer of the image to be uploaded   | No       |

---
   - **Response:**
     ```json
      {
        "success": "Post Created Successfully",
        "loggedInUser": {
            "_id": "user-id",
            "posts": ["post-id-1", "post-id-2", ...],
            ...
        },
        "post": {
            "_id": "post-id",
            "caption": "This is a sample caption",
            "photoURL": "optional-image-url",
            "owner": "user-id",
            "likes": [],
            "comments": [],
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
      }
     ```

### 4. **Create Comment**
   - **URL:** `/api/post/comment`
   - **Method:** `POST`
   - **Description:** Adds a comment to a post.
   - **Request Body:**
     ```json
     {
       "postId": "uuid",
       "text": "string"
     }
     ```
   - **Response:**
     ```json
      {
        "_id": "postId",
        "caption": "Post caption",
        "photoURL": "URL to post image",
        "owner": "userId",
        "likes": ["userId1", "userId2", ...],
        "comments": [
            {
                "userId": "userId",
                "text": "This is a comment.",
                "userProfilePic": "URL to user's profile pic",
                "userName": "User's name",
                "createdAt": "timestamp"
            },
            // other comments...
        ],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      } 
     ```

### 5. **Like Post**
   - **URL:** `/api/post/like/{postId}`
   - **Method:** `PATCH`
   - **Description:** Likes or unlikes a post by the logged-in user. If the post is already liked, it will be unliked.
   - **Response:**
     ```json
      { 
        "loggedInUser": {
            "_id": "user-id",
            "likedPosts": ["post-id-1", "post-id-2", ...],
            ...
        },
        "post": {
            "_id": "post-id",
            "caption": "This is a sample caption",
            "photoURL": "optional-image-url",
            "owner": "user-id",
            "likes": ["user-id-1", "user-id-2", ...],
            "comments": [],
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
      }
     ```

### 6. **Save Post**
   - **URL:** `/api/post/save/:postId`
   - **Method:** `PATCH`
   - **Description:** Saves or unsaves a post for the logged-in user. If the post is already saved, it will be unsaved.
   - **Response:**
     ```json
     {
        "loggedInUser": {
          "_id": "userId",
          "savedPosts": ["postId1", "postId2", ...],
          // other user fields...
          }
      }
     ```

### 7. **Delete Post**
   - **URL:** `/api/post/delete/{postId}`
   - **Method:** `DELETE`
   - **Description:** Deletes a post if the logged-in user is the owner of the post
   - **Response:**
     ```json
     {
       "message": "Post deleted successfully."
     }
     ```

---

## 4. **Follow Requests API**

#### Endpoints:

### 1. **Get All Follow Requests**
   - **URL:** `/api/request/`
   - **Method:** `GET`
   - **Description:** Retrieves all follow requests for the authenticated user.
   - **Response:**
     ```json
      [
        {
          "_id": "request-id",
          "from": "user-id-of-sender",
          "to": "user-id-of-recipient",
          "status": "pending/accepted/rejected",
        },
      ...
      ]
     ```

### 2. **Send Follow Request**
   - **URL:** `/api/request/send`
   - **Method:** `POST`
   - **Description:** Sends a follow request from the current user to another user. If a follow request already exists, it is removed.
   - **Request Body:**
     ```json
     {
       "receiverId": "uuid"
     }
     ```
   #### 1. When the request is sent successfully:

```json
{
  "message": "request sent successfully!!",
  "request": {
    "_id": "request-id",
    "from": "user-id-of-sender",
    "to": "user-id-of-recipient",
    "status": "pending",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```
#### 2. When the request is removed successfully
```json
     {
       "message": "Follow removed successfully."
     }
```

### 3. **Accept Follow Request**
   - **URL:** `/api/request/accept`
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

### 4. **Reject Follow Request**
   - **URL:** `/api/request/reject`
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


## 5. **Notifications API**

#### Endpoints:

### 1. **Get All Notifications**
   - **URL:** `/api/notification`
   - **Method:** `GET`
   - **Description:** Retrieves all notifications for the authenticated user.
   - **Response:**
     ```json
     [
       {
         "notificationId": "uuid",
         "reciever":"uuid",
         "type":"requestAccepted/like/comment",
         "read": "boolean",
         "created_at": "timestamp"
       }
     ]
     ```

### 2. **Mark All Notifications as Read**
   - **URL:** `/api/notification`
   - **Method:** `PATCH`
   - **Description:** Marks all notifications as read for the authenticated user.
   - **Response:**
     ```json
     {
       "message": "All notifications marked as read."
     }
     ```

### 3. **Delete All Notifications**
   - **URL:** `/api/notification`
   - **Method:** `DELETE`
   - **Description:** Deletes all notifications for the authenticated user.
   - **Response:**
     ```json
     {
       "message": "All notifications deleted successfully."
     }
     ```

---

## 6. **Chat API**

#### Endpoints:

### 1. **Send Message**
   - **URL:** `/api/chat/message`
   - **Method:** `POST`
   - **Description:** Sends a message from one user to another. If there is no existing conversation between the sender and receiver, a new conversation is created.

---

### Request Body Parameters

| Parameter     | Type    | Description                                     | Required |
|---------------|---------|-------------------------------------------------|----------|
| `message`     | String  | The message content, trimmed                    | Yes      |
| `recieverId`  | String  | The ID of the user receiving the message         | Yes      |
| `img`         | String  | (Optional) Image Buffer to be sent with the message | No       |

---

   - **Response:**
     ```json
      {
        "_id": "message-id",
        "senderId": "sender-id",
        "conversationId": "conversation-id",
        "message": "Message content",
        "img": "Image URL (if any)",
        "seen": false,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
     ```

### 2. **Get All Messages with a User**
   - **URL:** `/api/chat/:receiverId`
   - **Method:** `GET`
   - **Description:** Retrieves all messages exchanged between the authenticated user and a specified user (receiverId).
   - **Response:**
     ```json
      {
        "messages": [
          {
            "_id": "message-id",
            "senderId": "sender-id",
            "conversationId": "conversation-id",
            "message": "Message content",
            "img": "Image URL (if any)",
            "seen": false,
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
          },
          ...
        ]
      }

     ```

### 3. **Get All Conversations**
   - **URL:** `/api/chat/`
   - **Method:** `GET`
   - **Description:** Retrieves a list of all conversations the authenticated user is part of.
   - **Response:**
     ```json
      [
        {
          "_id": "conversation-id",
          "participants": [
            "user-id-1",
            "user-id-2"
          ],
          "createdAt": "timestamp",
          "updatedAt": "timestamp"
        },
        ...
      ]
     ```

