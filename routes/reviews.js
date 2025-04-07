const express = require("express");
const { body, validationResult } = require("express-validator");
const pool = require("../db");

const router = express.Router();

const validateReview = [
    body("movie_id").isInt().withMessage("Movie ID must be an integer"),
    body("reviewer_name").notEmpty().withMessage("Reviewer name is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
];

// Add a review for a movie
router.post("/", validateReview, async (req,res) => {
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
      const { movie_id, reviewer_name, rating, comment } = req.body;
      const result = await pool.query(
      "INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [movie_id, reviewer_name, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({error: "Failed to add review", details: err.message});
  }
});

// Get all reviews for a specific movie with pagination
router.get("/:movie_id", async (req, res) => {
   try {
     const { movie_id } = req.params;
     let { page = 1, limit = 10 } = req.query;

     // Convert query params to numbers
     page = parseInt(page, 10) || 1;
     limit = parseInt(limit, 10) || 10;
     const offset = (page - 1) * limit;

     const result = await pool.query(
       "SELECT * FROM reviews WHERE movie_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
       [movie_id, limit, offset]
     );

     res.json(result.rows);
    } catch (err) {
     console.error("Error fetching reviews:", err);
     res.status(500).json({error: "Failed to fetch reviews", details: err.message});
   }
});


//Delete Movies using movie_id 
router.delete('/:movie_id', async(req, res) => {
   
    const {movie_id} = req.params;
  try {
     const result = await pool.query("DELETE FROM reviews WHERE movie_id = $1 RETURNING*", [movie_id]);
     res.json({
      message: "Review Deleted Successfully",
      reviews: result.rows[0]
    });
   } catch(err) {
     console.error("Error deleting reviews: ", err);
     res.status(500).json({
      error: "Failed to delete reviews",
      details: err.message
    });
   }
});



module.exports = router;
