import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import QuestionCard from '../components/QuestionCard';
import {
  FunnelIcon,
} from '@heroicons/react/24/outline';

const sortOptions = [
  { name: 'Newest', value: 'newest' },
  { name: 'Active', value: 'active' },
  { name: 'Votes', value: 'votes' },
  { name: 'Unanswered', value: 'unanswered' },
];

export default function HomePage() {
  const { questions } = useApp();
  const [selectedSort, setSelectedSort] = useState('newest');

  const sortedQuestions = [...questions].sort((a, b) => {
    switch (selectedSort) {
      case 'votes':
        return b.votes - a.votes;
      case 'unanswered':
        return a.answers.length - b.answers.length;
      case 'active':
        // Sort by most recent activity (answers or question creation)
        const aLastActivity = a.answers.length > 0 
          ? Math.max(...a.answers.map(ans => new Date(ans.createdAt).getTime()))
          : new Date(a.createdAt).getTime();
        const bLastActivity = b.answers.length > 0 
          ? Math.max(...b.answers.map(ans => new Date(ans.createdAt).getTime()))
          : new Date(b.createdAt).getTime();
        return bLastActivity - aLastActivity;
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      {/* Header */}
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-6 text-gray-900">All Questions</h1>
          <p className="mt-2 text-sm text-gray-700">
            {questions.length} questions
          </p>
        </div>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Filter
          </button>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mt-6 border-b border-gray-200">
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
        {sortedQuestions.length > 0 ? (
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