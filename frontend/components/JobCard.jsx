import Link from 'next/link';

const statusColors = {
  Open: 'bg-green-100 text-green-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Closed: 'bg-red-100 text-red-700',
};

const JobCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition cursor-pointer">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
          <span className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${statusColors[job.status]}`}>
            {job.status}
          </span>
        </div>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-400">
          {job.category && (
            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
              {job.category}
            </span>
          )}
          {job.location && <span>📍 {job.location}</span>}
          <span>
            🕒 {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;