import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import FreelancerForm from "./FreelancerForm";

const jobListings = [
    { id: 1, title: "Software Engineer", company: "TechCorp", package: "₹12 LPA", experience: "2-4 years" },
    { id: 2, title: "Frontend Developer", company: "WebX", package: "₹10 LPA", experience: "1-3 years" },
    { id: 3, title: "Data Scientist", company: "DataGenix", package: "₹15 LPA", experience: "3-5 years" },
    { id: 4, title: "Backend Developer", company: "CodeBase", package: "₹11 LPA", experience: "2-4 years" },
    { id: 5, title: "UI/UX Designer", company: "DesignHub", package: "₹9 LPA", experience: "1-3 years" },
    { id: 6, title: "DevOps Engineer", company: "CloudWave", package: "₹14 LPA", experience: "3-5 years" },
    { id: 7, title: "AI Engineer", company: "NeuralNet", package: "₹16 LPA", experience: "4-6 years" },
    { id: 8, title: "Product Manager", company: "BizSolutions", package: "₹20 LPA", experience: "5-7 years" },
    { id: 9, title: "Cybersecurity Analyst", company: "SecureTech", package: "₹13 LPA", experience: "2-5 years" },
    { id: 10, title: "Cloud Architect", company: "CloudSync", package: "₹18 LPA", experience: "5-8 years" },
];

const JobList = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicantType, setApplicantType] = useState("");

    const handleApply = (jobId) => {
        setSelectedJob(jobListings.find(job => job.id === jobId));
        setApplicantType(""); // Reset selection
    };

    const handleCancel = () => {
        setSelectedJob(null);
        setApplicantType("");
    };

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobListings.map((job) => (
                    <li key={job.id}>
                        <strong>{job.title}</strong> at {job.company} <br />
                        <span>Package: {job.package}</span> | <span>Experience: {job.experience}</span>
                        <br />
                        <button onClick={() => handleApply(job.id)}>Apply</button>
                    </li>
                ))}
            </ul>

            {selectedJob && !applicantType && (
                <div>
                    <h3>Apply for {selectedJob.title} at {selectedJob.company}</h3>
                    <button onClick={() => setApplicantType("employee")}>Apply as Employee</button>
                    <button onClick={() => setApplicantType("freelancer")}>Apply as Freelancer</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {applicantType === "employee" && <EmployeeForm job={selectedJob} onCancel={handleCancel} />}
            {applicantType === "freelancer" && <FreelancerForm job={selectedJob} onCancel={handleCancel} />}
        </div>
    );
};

export default JobList;
