'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getJobById, updateJobStatus, deleteJob } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';

const statusColors = {
    Open: 'bg-green-100 text-green-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    Closed: 'bg-red-100 text-red-700',
};

const statuses = ['Open', 'In Progress', 'Closed'];

const JobDetailPage = ({ params }) => {
    const router = useRouter();
    const { id } = React.use(params);
    const { token, user } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const data = await getJobById(id);
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;

        try {
            setUpdating(true);
            const updated = await updateJobStatus(id, newStatus);
            setJob(updated);
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this job?');
        if (!confirmed) return;

        try {
            setDeleting(true);
            await deleteJob(id, token);
            router.push('/');
        } catch (err) {
            alert(err.message);
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <p className="text-center text-gray-400 mt-20">Loading job details...</p>
        );
    }

    if (error) {
        return (
            <p className="text-center text-red-500 mt-20">Error: {error}</p>
        );
    }

    if (!job) return null;

    return (
        <div className="max-w-2xl mx-auto">

            <button
                onClick={() => router.push('/')}
                className="text-sm text-blue-600 hover:underline mb-6 inline-block"
            >
                ← Back to listings
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                <div className="flex items-start justify-between gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusColors[job.status]}`}>
                        {job.status}
                    </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {job.category && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Category</p>
                            <p className="text-sm font-medium text-gray-700">{job.category}</p>
                        </div>
                    )}
                    {job.location && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Location</p>
                            <p className="text-sm font-medium text-gray-700">📍 {job.location}</p>
                        </div>
                    )}
                    {job.contactName && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Contact Name</p>
                            <p className="text-sm font-medium text-gray-700">{job.contactName}</p>
                        </div>
                    )}
                    {job.contactEmail && (
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Contact Email</p>
                            <p className="text-sm font-medium text-gray-700">{job.contactEmail}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Posted</p>
                        <p className="text-sm font-medium text-gray-700">
                            {new Date(job.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-600">
                                Update Status:
                            </label>
                            <select
                                value={job.status}
                                onChange={handleStatusChange}
                                disabled={updating}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                            >
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                            {updating && (
                                <span className="text-xs text-gray-400">Saving...</span>
                            )}
                        </div>

                        {user && job.createdBy === user.id && (
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
                            >
                                {deleting ? 'Deleting...' : 'Delete Job'}
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;