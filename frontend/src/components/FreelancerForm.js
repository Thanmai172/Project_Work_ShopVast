import React, { useState } from "react";
import axios from "axios";

const FreelancerForm = ({ job, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        skills: "",
        portfolio: "",
        resume: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("skills", formData.skills);
        data.append("portfolio", formData.portfolio);
        data.append("resume", formData.resume);

        try {
            await axios.post("https://project-work-shopvast-2.onrender.com/api/freelancers", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("Application Submitted Successfully!");
            onCancel();
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };

    return (
        <div>
            <h2>Freelancer Application for {job.title}</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Skills:</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />

                <label>Portfolio Link:</label>
                <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} required />

                <label>Resume (optional):</label>
                <input type="file" onChange={handleFileChange} />

                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default FreelancerForm;
