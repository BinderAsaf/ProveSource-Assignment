# ProveSource-Assignment

#### Node.js and Express server.
#### Mongodb as database.

Account API:
- Account has email, name and age as fields.
- email is unique.
- POST to /account/create : add new account to the db. 

Notification API;
- Notification has accountId, name and color as fields.
- POST   /notifications : get accountId, name, color as parameters. add new Notification to db.
- GET    /notifications : get a url parameter: accountId . return all notifications with the  given id. 
- DELETE /notifications : get a url parameter: accountId,color. deletes all notification with color of accountId.

## Install and Run :  
npm install   
npm start
