import React, { useEffect, useState } from 'react';  
import axios from 'axios';  

const Joblist = () => {  
  const [jobs, setJobs] = useState([]);  

  useEffect(() => {  
    const fetchJobs = async () => {  
      try {  
        const response = await axios.get('http://localhost:5000/api/jobs');  
        setJobs(response.data);  
      } catch (error) {  
        console.error('Error fetching jobs:', error);  
      }  
    };  

    fetchJobs();  
  }, []);  

  return (  
    <div>  
      <h1>Job Listings</h1>  
      <ul>  
        {jobs.map(job => (  
          <li key={job._id}>  
            <h2>{job.title}</h2>  
            <p>{job.description}</p>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default Joblist;