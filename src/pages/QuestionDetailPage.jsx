import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BookmarkIcon,
  ShareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getQuestionById, 
    incrementViews, 
    voteQuestion, 
    voteAnswer, 
    addAnswer,
    currentUser,
    savedQuestions,
    toggleSaveQuestion
  } = useApp();
  
  const [question, setQuestion] = useState(null);
  const [answerBody, setAnswerBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const viewsIncrementedRef = useRef(null);

  // Effect to load question data
  useEffect(() => {
    const foundQuestion = getQuestionById(id);
    if (foundQuestion) {
      setQuestion(foundQuestion);
    } else {
      navigate('/app');
    }
  }, [id, getQuestionById, navigate]);

  // Effect to increment views only once per question
  useEffect(() => {
    if (question && viewsIncrementedRef.current !== id) {
      incrementViews(id);
      viewsIncrementedRef.current = id;
    }
  }, [id, question, incrementViews]);

  const handleVoteQuestion = (voteType) => {
    voteQuestion(id, voteType);
    setQuestion(prev => ({ ...prev, votes: prev.votes + voteType }));
  };

  const handleVoteAnswer = (answerId, voteType) => {
    voteAnswer(id, answerId, voteType);
    setQuestion(prev => ({
      ...prev,
      answers: prev.answers.map(a => 
        a.id === answerId ? { ...a, votes: a.votes + voteType } : a
      )
    }));
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!currentUser?.isActive || !answerBody.trim()) return;

    setIsSubmitting(true);
    try {
      addAnswer(id, answerBody);
      setAnswerBody('');
      // Refresh question data
      const updatedQuestion = getQuestionById(id);
      setQuestion(updatedQuestion);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!question) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Question not found</h3>
        <p className="mt-1 text-sm text-gray-500">The question you're looking for doesn't exist.</p>
      </div>
    );
  }

  const isSaved = savedQuestions.includes(question.id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Question */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 mb-6">
        <div className="flex gap-6">
          {/* Vote Column */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleVoteQuestion(1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black"
            >
              <ArrowUpIcon className="h-6 w-6" />
            </button>
            <span className="text-xl font-semibold text-gray-900">{question.votes}</span>
            <button
              onClick={() => handleVoteQuestion(-1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black"
            >
              <ArrowDownIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => toggleSaveQuestion(question.id)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black mt-2"
            >
              {isSaved ? (
                <BookmarkSolidIcon className="h-6 w-6 text-black" />
              ) : (
                <BookmarkIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
            <div className="prose max-w-none text-gray-700 mb-6">
              <p className="whitespace-pre-wrap">{question.body}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <span>{question.views} views</span>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <ShareIcon className="h-4 w-4" />
                  Share
                </button>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="h-6 w-6 rounded-full"
                  src={question.author.avatar}
                  alt=""
                />
                <span className="font-medium text-gray-700">{question.author.name}</span>
                <span>{question.author.reputation} rep</span>
                <time dateTime={question.createdAt}>
                  {new Date(question.createdAt).toLocaleDateString()}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
        </h2>

        {question.answers.length > 0 ? (
          <div className="space-y-6">
            {question.answers.map((answer) => (
              <div key={answer.id} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
                <div className="flex gap-6">
                  {/* Vote Column */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleVoteAnswer(answer.id, 1)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black"
                    >
                      <ArrowUpIcon className="h-6 w-6" />
                    </button>
                    <span className="text-xl font-semibold text-gray-900">{answer.votes}</span>
                    <button
                      onClick={() => handleVoteAnswer(answer.id, -1)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black"
                    >
                      <ArrowDownIcon className="h-6 w-6" />
                    </button>
                    {answer.isAccepted && (
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="prose max-w-none text-gray-700 mb-4">
                      <p className="whitespace-pre-wrap">{answer.body}</p>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-end text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <img
                          className="h-6 w-6 rounded-full"
                          src={answer.author.avatar}
                          alt=""
                        />
                        <span className="font-medium text-gray-700">{answer.author.name}</span>
                        <span>{answer.author.reputation} rep</span>
                        <time dateTime={answer.createdAt}>
                          {new Date(answer.createdAt).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No answers yet. Be the first to answer!</p>
          </div>
        )}
      </div>

      {/* Answer Form */}
      {currentUser?.isActive ? (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
              rows={6}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              placeholder="Write your answer here..."
              required
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !answerBody.trim()}
                className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Posting...' : 'Post Answer'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600">You need to be logged in to post an answer.</p>
        </div>
      )}
    </div>
  );
}