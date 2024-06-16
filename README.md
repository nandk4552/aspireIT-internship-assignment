# Backend Server for integrating pre-trained machine learning model for sentiment analysis with a secure file handling system and secure authentication using Express.js and MongoDB.

### MVC Pattern is used to built this server

```
Model - modeling and structering the NoSQL database
View - fronted views or user interface views
Controller - where we write our business logic to verify and validate interactions
```

# POSTMAN API COLLECTION FOR THIS PROJECT

```
https://elements.getpostman.com/redirect?entityId=21207467-36ce5986-593f-46a1-848b-0c7c5a9d23ff&entityType=collection
```

# contact Details

```
Name: DEVARLA NAND KISHORE
Email: nandk4552@gmail.com
LinkedIn: https://www.linkedin.com/in/nandk4552/ 
Twitter: https://x.com/nandk_1
```

# setup and initialization

```
- download zip file or git clone the repository
- cd intern && npm i
- to run the server -> "npm run server"
- if you don't have nodemon install using "npm i nodemon"
- again run the server
```

# task 1 - Machine Learning Model Integration:

```
API: "http://localhost:3000/api/v1/sentiment/analyze"
- to evaluate the pre-trained sentiment analysis machine learning model using
VaderSentimentAnalysis
- open postman link i have pasted in the README file
- go to the folder sentiment under ASPIREIT
- click body enter "{
    "text": "I Love Programming",
}"
- hit send you'll get a response "positive or negative"
```

# task 2 - Secure File Handling:

```
UPLOAD FILE API: "http://localhost:3000/api/v1/file/upload"
DOWNLOAD FILE API: "http://localhost:3000/api/v1/file/download/:filename"

***UPLOAD FILE***
- under FILE UPLOADS folder in postman go to uploadfile req
- open body select form data, choose file and name as file and upload pdf/audio/video
- hit send request you'll get file uploaded successfully
***DOWNLOAD FILE***
- under FILE UPLOADS folder in postman go to downloadfile req
- in the url replace :filename with your uploaded filename
- hit send request you'll get the file

```

# task 3 - NoSQL Database Integration:

```

- Integrated MongoDB with the server for storing both textual data for sentiment
  analysis and binary data for file storage.
  • Designed appropriate database schemas for storing text data

```

# task 4 -Authentication System:

```
LOGIN USER: "http://localhost:3000/api/v1/auth/login"
REGISTER USER: "http://localhost:3000/api/v1/auth/register"
GET USER DATA: "http://localhost:3000/api/v1/user/getUser"
UPDATE USER DATA: "http://localhost:3000/api/v1/user/updateUser"
UPDATE USER DATA: "http://localhost:3000/api/v1/user/updateUser"
RESET PASSWORD: "http://localhost:3000/api/v1/user/resetPassword"
UPDATE PASSWORD: "http://localhost:3000/api/v1/user/updatePassword"
DELETE PASSWORD: "http://localhost:3000/api/v1/user/deleteUser/:id"

• Implement authentication system  user registration, login functionality with hashed
passwords stored securely in the database.
• Ensure that authentication tokens are securely generated and transmitted
over HTTPS.
```
