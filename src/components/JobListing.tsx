'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

import logoMap from '../utils/logoMap';

interface Job {
  title: string;
  company: string;
  location: string;
}

const JobListing = ({ job }: { job: Job }) => {
  const logoSrc = logoMap[job.company] || '/logos/default.png';

  return (
    <div className="flex items-center rounded bg-white p-4 shadow-md">
      <div className="mr-4 size-20 overflow-hidden rounded-full">
        <Image
          src={logoSrc}
          alt={`${job.company} logo`}
          width={80}
          height={80}
          className="size-full scale-125"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="font-bold text-blue-600">{job.company}</p>
        <p className="flex items-center text-gray-500">
          <MapPinIcon className="mr-1 size-5 text-gray-500" /> {job.location}
        </p>
      </div>
    </div>
  );
};

export default JobListing;
