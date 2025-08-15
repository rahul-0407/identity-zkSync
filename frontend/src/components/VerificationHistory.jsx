import React, { useState, useEffect } from 'react';

const FILTER_OPTIONS = [
  { label: 'Last Day', value: 'lastDay' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Last Year', value: 'lastYear' },
  { label: 'All Time', value: 'allTime' },
];

const SORT_OPTIONS = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

const VerificationHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('allTime');
  const [sort, setSort] = useState('desc');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verifications?filter=${filter}&sort=${sort}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error('Failed to fetch verification history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [filter, sort]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-neutral-950 text-white rounded-xl mt-20">
      {/* Header with filter and sort */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-semibold">History</h2>

        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-35 transform rounded-lg flex justify-evenly items-center bg-black px-6 py-2 font-medium text-black dark:text-white transition-all duration-300  hover:bg-gray-800 dark:bg-[rgba(79,82,255,0.92)] dark:hover:bg-[rgba(68,51,255)] box dark outline-0"
          >
            {FILTER_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className='p-6 border-0 rounded-lg outline-0'>{opt.label}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-45 transform rounded-lg flex justify-evenly items-center bg-black px-6 py-2 font-medium text-black dark:text-white transition-all duration-300  hover:bg-gray-800 dark:bg-[rgba(79,82,255,0.92)] dark:hover:bg-[rgba(68,51,255)] box dark outline-0"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* History List */}
      <div className="overflow-y-auto max-h-[650px] bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-sm hide-scrollbar">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-center text-gray-500">No verifications found.</p>
        ) : (
          <table className="w-full table-auto border-collapse text-gray-300">
            <thead>
              <tr>
                <th className="text-left p-3 py-4 border-b border-gray-700 text-[rgba(79,82,255,0.92)] text-lg">#</th>
                <th className="text-left p-2 border-b border-gray-700 text-[rgba(79,82,255,0.92)] text-lg">Owner Name</th>
                <th className="text-left p-2 border-b border-gray-700 text-[rgba(79,82,255,0.92)] text-lg">Owner Address</th>
                <th className="text-left p-2 border-b border-gray-700 text-[rgba(79,82,255,0.92)] text-lg">Verified At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={item._id} className="hover:bg-gray-700">
                  <td className="p-2 py-5 border-b border-gray-700">{idx + 1}</td>
                  <td className="p-2 py-5 border-b border-gray-700">{item.ownerName}</td>
                  <td className="p-2 py-5 border-b border-gray-700 break-all">{item.ownerAddress}</td>
                  <td className="p-2 py-5 border-b border-gray-700">
                    {new Date(item.verifiedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VerificationHistory;
