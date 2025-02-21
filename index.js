const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// POST API: Process input data
app.post("/bfhl", (req, res) => {
    console.log("Received POST request with data:", req.body); // Log request data for debugging

    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            console.error("Invalid input received:", req.body);
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const numbers = data.filter(item => !isNaN(item));   // Extract numbers
        const alphabets = data.filter(item => isNaN(item)); // Extract alphabets

        const highestAlphabet = alphabets.length ? alphabets.sort().reverse()[0] : null; // Highest alphabet

        const response = {
            is_success: true,
            user_id: "kashni_arora",
            email: "kashniarora73@gmail.com",
            roll_number: "22BCS13644",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        };

        console.log("Response sent:", response); // Log the response data
        res.json(response);

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET API: Return operation code
app.get("/bfhl", (req, res) => {
    console.log("Received GET request on /bfhl");
    res.json({ operation_code: 1 });
});

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Bajaj Finserv API Challenge!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
