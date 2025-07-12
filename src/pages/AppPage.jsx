import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MobileSidebar from '../components/MobileSidebar';
import QuestionCard from '../components/QuestionCard';
import { mockQuestions } from '../data/mockData';
import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

const sortOptions = [
  { name: 'Newest', value: 'newest', current: true },
  { name: 'Active', value: 'active', current: false },
  { name: 'Votes', value: 'votes', current: false },
  { name: 'Unanswered', value: 'unanswered', current: false },
];

export default function AppPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');

  return (
    <div>
      <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar />

      <div className="lg:pl-72">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold leading-6 text-gray-900">All Questions</h1>
                <p className="mt-2 text-sm text-gray-700">
                  {mockQuestions.length} questions
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
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Ask Question
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
              <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
                {mockQuestions.map((question, index) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                      <span className="font-medium">{mockQuestions.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        2
                      </button>
                      <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}