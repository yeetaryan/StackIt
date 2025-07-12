import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AskQuestionPage() {
  const navigate = useNavigate();
  const { currentUser, addQuestion } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.isActive) return;

    setIsSubmitting(true);
    
    try {
      const questionData = {
        title: formData.title,
        body: formData.body,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      const questionId = addQuestion(questionData);
      navigate(`/question/${questionId}`);
    } catch (error) {
      console.error('Error creating question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!currentUser?.isActive) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Authentication Required</h3>
        <p className="mt-1 text-sm text-gray-500">You need to be logged in to ask a question.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ask a Question</h1>
        <p className="mt-2 text-sm text-gray-600">
          Get help from the community by asking a clear, detailed question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                Title
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Be specific and imagine you're asking a question to another person.
              </p>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="e.g. How to center a div with CSS?"
              />
            </div>

            {/* Body */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-900">
                Body
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Include all the information someone would need to answer your question.
              </p>
              <textarea
                name="body"
                id="body"
                required
                rows={8}
                value={formData.body}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Describe your problem in detail..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-900">
                Tags
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Add up to 5 tags to describe what your question is about. Separate tags with commas.
              </p>
              <input
                type="text"
                name="tags"
                id="tags"
                required
                value={formData.tags}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="e.g. javascript, react, css"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.body || !formData.tags}
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </button>
        </div>
      </form>
    </div>
  );
}