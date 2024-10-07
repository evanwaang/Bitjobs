'use client';

import React, { useEffect, useState } from 'react';

import JobListing from './JobListing';

interface Job {
  title: string;
  company: string;
  location: string;
}

const JobListingContainer = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          'https://bitjobs-server-ce5e35e35657.herokuapp.com/api/jobs',
        );
        const data = await response.json();

        setJobs(data as Job[]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto rounded-sm p-6">
      <h1 className="mb-4 text-3xl font-bold">Job Listings</h1>

      <div className="grid gap-6">
        {currentJobs.map((job, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <JobListing key={`${job.title}-${job.company}-${index}`} job={job} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <button
          type="button" // Explicitly setting button type
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button" // Explicitly setting button type
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobListingContainer;
