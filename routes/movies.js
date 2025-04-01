const express = require("express");
const pool = require("../db");
const router = express.Router();

//add new movie
router.post("/", async (req, res) => {
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

//Get all movies
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM movies ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch movies"});
    }
});

module.exports =  router;