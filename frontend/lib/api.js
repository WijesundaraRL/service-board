const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// get all jobs
export const getJobs = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.category) params.append('category', filters.category);
  if (filters.status) params.append('status', filters.status);

  const queryString = params.toString();
  const url = `${BASE_URL}/api/jobs${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch jobs');

  return res.json();
};

// get single job
export const getJobById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Job not found');

  return res.json();
};

// create job 
export const createJob = async (data, token) => {
  const res = await fetch(`${BASE_URL}/api/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create job');
  }

  return res.json();
};

// update status
export const updateJobStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update status');
  }

  return res.json();
};

// delete job
export const deleteJob = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete job');

  return res.json();
};

// register
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }

  return res.json();
};

// login
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
};