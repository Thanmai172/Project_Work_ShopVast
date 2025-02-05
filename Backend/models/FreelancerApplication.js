const mongoose = require("mongoose");

const freelancerApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    skills: { type: [String], required: true },
    portfolio: { type: String, required: false },
    resume: { type: String, required: false }
});

const FreelancerApplication = mongoose.model("FreelancerApplication", freelancerApplicationSchema);
module.exports = FreelancerApplication;
