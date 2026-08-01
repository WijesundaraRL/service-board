'use client';

import { useState, useEffect } from 'react';
import { getJobs } from '../lib/api';
import JobCard from '../components/JobCard';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = {};
        if (category !== 'All') filters.category = category;

        const data = await getJobs(filters);
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service Requests</h1>
          <p className="text-gray-500 text-sm mt-1">Browse open jobs or post your own</p>
        </div>
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {loading && (
        <p className="text-center text-gray-400 mt-20">Loading jobs...</p>
      )}

      {error && (
        <p className="text-center text-red-500 mt-20">Error: {error}</p>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No jobs found. Be the first to post one!
        </p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;