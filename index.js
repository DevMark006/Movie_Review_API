const express = require("express");
const pool = require("./db");
const moviesRoutes = require("./routes/movies");
const reviewsRoutes = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/test-db", async(req,res) => {
 try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected", time: result.rows[0].now});
} catch (err) {
    console.error(err);
    res.status(500).json({error: "Database connection failed"});   
}
});

app.use(express.json());
app.use("/movies", moviesRoutes);
app.use("/reviews", reviewsRoutes);

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});


