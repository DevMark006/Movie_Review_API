# Movie Review API 

An API for managing movies and movie reviews using node.js, express and postgresql.

## Key Features
 
- ADD, RETRIEVE, UPDATE, DELETE Movies
- ADD, RETRIEVE, UPDATE, DELETE Movie Reviews
- Input validation using express-validator
- Pagination for movie and review listings
- Improved error handling

## Required installed dependencies 
1. Install dependencies
   - npm install
2. Initialized node.js 
   - npm init -y
3. Install express and postgresql client
   - npm install express pg dotenv
   *express - backend framework*
   *pg - postgresql client for node.js*
   *dotenv - manage environment variable*
4. Install express-validator
   - npm install express-validator 

## Setup 
1. Set up your postgresql database
   *CREATE DATABASE movie_reviews;*
2. Create .env file for postgresql database credentials
   *DATABASE_URL=postgresql://your_username:your_password@localhost:5432 movie_reviews*
3. Create required postgresql database tables run migrate.js 
   **node migrate.js** 
4. Run the server index.js
   **node index.js**

## API End Points

Movie Endpoints

**GET**   GET /movies?page=1&limit=10
**POST**  POST /movies
**PUT**   
**DELETE**

Reviews Endpoints

**GET**   GET /reviews/:movie_id?page=1&limit=5
**POST**  POST /reviews
**PUT**   
**DELETE**
