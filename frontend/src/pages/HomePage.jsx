import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import QuestionCard from '../components/QuestionCard';
import {
  // FunnelIcon, // Remove unused icon
} from '@heroicons/react/24/outline';

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Active', value: 'active' },
  { name: 'Votes', value: 'votes' },
  { name: 'Unanswered', value: 'unanswered' },
];

export default function HomePage() {
<<<<<<< Updated upstream:src/pages/HomePage.jsx
  const { questions, getAllTags } = useApp();
=======
  const { questions, loading, error } = useApp();
>>>>>>> Stashed changes:frontend/src/pages/HomePage.jsx
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('');
  const tags = getAllTags();

  // Filter questions by tag if selected
  const filteredQuestions = selectedTag
    ? questions.filter(q => q.tags.includes(selectedTag))
    : questions;

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (selectedSort) {
      case 'votes':
        return (b.vote_count || 0) - (a.vote_count || 0);
      case 'unanswered':
        return (a.answer_count || 0) - (b.answer_count || 0);
      case 'active':
        // Sort by most recent activity (updated_at or created_at)
        const aLastActivity = new Date(a.updated_at || a.created_at).getTime();
        const bLastActivity = new Date(b.updated_at || b.created_at).getTime();
        return bLastActivity - aLastActivity;
      case 'newest':
      default:
        return new Date(b.created_at) - new Date(a.created_at);
    }
  });

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-6 text-gray-900 mb-2 sm:mb-3">All Questions</h1>
            <p className="mt-1 text-sm text-gray-700 mb-4 sm:mb-0">
              {questions.length} questions
            </p>
          </div>
        </div>
        {/* Tag Filter Chips - visually separated from heading */}
        <div className="mt-2 mb-2 flex flex-wrap gap-2 sm:justify-end">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-3 py-1 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
              selectedTag === ''
                ? 'bg-black text-white border-black'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {tags.map(tag => (
            <button
              key={tag.name}
              onClick={() => setSelectedTag(tag.name)}
              className={`px-3 py-1 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${
                selectedTag === tag.name
                  ? 'bg-black text-white border-black'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {tag.name} <span className="ml-1 text-xs text-gray-400">({tag.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mt-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {sortOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => setSelectedSort(option.value)}
              className={`whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium ${
                selectedSort === option.value
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {option.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Questions List */}
      <div className="mt-6">
        {loading.general ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading questions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-sm">
              <p>{error}</p>
            </div>
          </div>
        ) : sortedQuestions.length > 0 ? (
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
            {sortedQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No questions</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by asking a new question.</p>
          </div>
        )}
      </div>
    </>
  );
}
