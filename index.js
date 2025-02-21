const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// POST API: Process input data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));

        // Find the highest alphabet (lexicographically)
        const highestAlphabet = alphabets.length ? alphabets.sort().reverse()[0] : null;

        // Response object
        res.json({
            is_success: true,
            user_id: "kashni_arora",
            email: "kashniarora73@gmail.com",
            roll_number: "22BCS13644",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET API: Return operation_code
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to Bajaj Finserv API Challenge!");
});

