'use client';

const categories = ['All', 'Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'];

const CategoryFilter = ({ selected, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-600">
        Filter by category:
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;