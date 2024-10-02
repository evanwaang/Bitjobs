// Component that fetches all the job data and returns it in a div

'use client';

import React, { useEffect, useState } from 'react';

// Define the job interface
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
}

const JobData = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Use the Job interface here

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          'https://bitjobs-server-ce5e35e35657.herokuapp.com/api/jobs',
        );
        const data = await response.json();
        setJobs(data as Job[]);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>
              {job.title} - {job.company}
            </h2>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobData;
