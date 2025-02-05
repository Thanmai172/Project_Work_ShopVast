const express = require("express");
const multer = require("multer");
const fs = require("fs");
const FreelancerApplication = require("../models/FreelancerApplication");

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up file storage for resumes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// POST route for freelancer applications
router.post("/", upload.single("resume"), async (req, res) => {
    const { name, email, phone, skills, portfolio } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!name || !email || !phone || !skills) {
        return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newApplication = new FreelancerApplication({
        name,
        email,
        phone,
        skills: skills.split(","), // Convert skills string to array
        portfolio,
        resume
    });

    try {
        const savedApplication = await newApplication.save();
        return res.status(201).json(savedApplication);
    } catch (error) {
        return res.status(500).json({ message: "Error saving application: " + error.message });
    }
});

// GET route to retrieve freelancer applications
router.get("/", async (req, res) => {
    try {
        const applications = await FreelancerApplication.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving applications: " + error.message });
    }
});

module.exports = router;
