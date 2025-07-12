import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function TagsPage() {
  const { getAllTags } = useApp();
  const tags = getAllTags();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
        <p className="mt-2 text-sm text-gray-600">
          A tag is a keyword or label that categorizes your question with other, similar questions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tags/${tag.name}`}
            className="bg-white p-4 rounded-lg shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700">
                {tag.name}
              </span>
              <span className="text-sm text-gray-500">{tag.count}</span>
            </div>
            <p className="text-sm text-gray-600">
              {tag.count} question{tag.count !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No tags yet</h3>
          <p className="mt-1 text-sm text-gray-500">Tags will appear here when questions are posted.</p>
        </div>
      )}
    </div>
  );
}