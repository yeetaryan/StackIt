import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  CalendarIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { currentUser, getUserQuestions, getUserAnswers } = useApp();
  
  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Not logged in</h3>
        <p className="mt-1 text-sm text-gray-500">You need to be logged in to view your profile.</p>
      </div>
    );
  }

  const userQuestions = getUserQuestions(currentUser.id);
  const userAnswers = getUserAnswers(currentUser.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-6">
          <img
            className="h-24 w-24 rounded-full"
            src={currentUser.avatar}
            alt=""
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
            
            <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <TrophyIcon className="h-4 w-4" />
                <span className="font-medium text-gray-900">{currentUser.reputation}</span>
                <span>reputation</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Joined {new Date(currentUser.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <QuestionMarkCircleIcon className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">{userQuestions.length}</p>
              <p className="text-sm text-gray-600">Questions Asked</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <ChatBubbleLeftIcon className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">{userAnswers.length}</p>
              <p className="text-sm text-gray-600">Answers Given</p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Questions</h2>
        {userQuestions.length > 0 ? (
          <div className="space-y-4">
            {userQuestions.map((question) => (
              <div key={question.id} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      <Link to={`/question/${question.id}`} className="hover:underline">
                        {question.title}
                      </Link>
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>{question.votes} votes</span>
                      <span>{question.answers.length} answers</span>
                      <span>{question.views} views</span>
                      <time dateTime={question.createdAt}>
                        {new Date(question.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {question.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>You haven't asked any questions yet.</p>
          </div>
        )}
      </div>

      {/* Answers */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Answers</h2>
        {userAnswers.length > 0 ? (
          <div className="space-y-4">
            {userAnswers.map((answer) => (
              <div key={answer.id} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      <Link to={`/question/${answer.questionId}`} className="hover:underline">
                        {answer.questionTitle}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {answer.body.substring(0, 150)}...
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <span>{answer.votes} votes</span>
                      {answer.isAccepted && (
                        <span className="text-green-600 font-medium">✓ Accepted</span>
                      )}
                      <time dateTime={answer.createdAt}>
                        {new Date(answer.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>You haven't answered any questions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}