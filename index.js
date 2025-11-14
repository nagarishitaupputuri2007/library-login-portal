const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/student-login', async (req, res) => {
    try {
        const { studentName, password } = req.body;

        if (!studentName || !password) {
            console.error("Missing fields");
            return res.status(400).json({ error: "studentName and password are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        res.cookie("student_name", studentName, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, 
        });

        res.json({ message: `Welcome to the Library Portal, ${studentName}!` });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
