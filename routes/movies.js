const express = require("express");
const pool = require("../db");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//validation rules for adding a movie
const validateMovie = [
    body("title").notEmpty().withMessage("Title is required"),
    body("release_year")
      .isInt({ min: 1800, max: new Date().getFullYear()})
      .withMessage(`Release year must be between 1800 and ${new Date().getFullYear()}`),
    body("rating").optional().isInt({min: 1, max: 10}).withMessage("Rating must be between 1 and 10"),
];

//add new movie
router.post("/", validateMovie, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    try {
    const {title, director, release_year, genre} = req.body;
    const result = await pool.query(
    "INSERT INTO movies (title, director, release_year, genre) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, director, release_year, genre]
    );
    res.status(201).json(result.rows[0]);
   } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add movie"});
   }
});

//Get all movies with pagination
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10} = req.query;
        const offset = (page - 1) * limit;

        const result = await pool.query("SELECT * FROM movies ORDER BY created_at DESC LIMIT $1 OFFSET $2",[limit, offset]);
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch movies"});
    }
});

//Delete movie by ID
router.delete("/:id", async (req, res) => {
   const {id} = req.params;
   try {
      await pool.query("DELETE FROM reviews WHERE movie_id = $1", [id]);
      const result = await pool.query("DELETE FROM movies WHERE id = $1 RETURNING*", [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({error: "Movie not found"});
      }
      res.json({ 
        message: "Movie deleted successfully", 
        movie: result.rows[0]
    });
    } catch (err) {
        console.error("Error deleting movie:", err);
        res.status(500).json({
            error: "Failed to delete movie", 
            details: err.message
        });
    }
});

//Update the movies by ID
router.put("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {title, director, release_year, genre} = req.body;
        //Update the value
        const result = await pool.query("UPDATE movies SET title = $1, director = $2, release_year = $3, genre = $4 WHERE id = $5 RETURNING *",[title, director, release_year, genre, id]);
        res.status(200).json(result.rows[0]);
    } catch(err) {
      console.error("Error updating movies", err);
      res.status(500).json({
        error: "Failed to Update Movies",
        details: err.message
      });
    }
});

module.exports =  router;