required dependencies
1. initialized node.js 
   - npm init -y
2. install express and postgresql client
   - npm install express pg dotenv
   //express - backend framework
   //pg - postgresql client for node.js
   //dotenv - manage environment variable
3. set up your postgresql database
   - CREATE DATABASE movie_reviews 
4. create .env file for postgresql database
   - DATABASE_URL=postgresql://your_username:your_password@localhost:5432/movie_reviews
5. create db.js for database connection 
6. create index.js for main server 


