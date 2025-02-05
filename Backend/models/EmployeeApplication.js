const mongoose = require("mongoose");

const employeeApplicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: Number, required: true },
    resume: { type: String, required: false },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true }
});

const EmployeeApplication = mongoose.model("EmployeeApplication", employeeApplicationSchema);
module.exports = EmployeeApplication;
