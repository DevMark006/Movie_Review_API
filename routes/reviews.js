const express = require("express");
const pool = require("../db");

const router = express.Router();

// Add a review for a movie
router.post("/", async (req,res) => {
  try {
    const { movie_id, reviewer_name, rating, comment } = req.body;
    const result = await pool.query(
      "INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [movie_id, reviewer_name, rating, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Failed to add review"});
  }
});

// Get all reviews for a specific movie
router.get("/:movie_id", async (req, res) => {
   try {
     const { movie_id } = req.params;
     const result = await pool.query("SELECT * FROM reviews WHERE movie_id = $1 ORDER BY created_at DESC", [movie_id]);
     res.json(result.rows);
    } catch (err) {
     console.error(err);
     res.status(500).json({error: "Failed to fetch reviews"});
   }
});

module.exports = router;
