import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = ({ job, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
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
        data.append("experience", formData.experience);
        data.append("resume", formData.resume);
        data.append("jobTitle", job.title);
        data.append("company", job.company);

        try {
            await axios.post("https://project-work-shopvast-2.onrender.com/api/employees", data, {
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
            <h2>Apply as Employee for {job.title}</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Experience:</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />

                <label>Resume:</label>
                <input type="file" onChange={handleFileChange} required />

                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
