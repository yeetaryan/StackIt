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
  const { questions, getAllTags } = useApp();
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