import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Mock user - simulating logged in state
const mockUser = {
  id: 'u123',
  name: 'Tom Cook',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  email: 'tom@example.com',
  reputation: 1250,
  joinedDate: '2023-01-15',
  isActive: true
};

// Initial mock questions
const initialQuestions = [
  {
    id: 'q1',
    title: 'How to handle async operations in JavaScript?',
    body: 'I\'m having trouble understanding how to properly handle asynchronous operations in JavaScript. Can someone explain the difference between callbacks, promises, and async/await? I\'ve been working on a project where I need to fetch data from an API and I\'m getting confused about the best approach.',
    tags: ['javascript', 'async', 'promises'],
    votes: 15,
    views: 234,
    answers: [],
    author: {
      id: 'u456',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      reputation: 892,
    },
    createdAt: '2024-01-15T10:30:00Z',
    hasAcceptedAnswer: false,
  },
  {
    id: 'q2',
    title: 'Best practices for React component optimization',
    body: 'What are the best practices for optimizing React components? I\'m looking for techniques to improve performance in a large application. My app is getting slower as it grows and I need to optimize it.',
    tags: ['react', 'performance', 'optimization'],
    votes: 8,
    views: 156,
    answers: [
      {
        id: 'a1',
        body: 'Here are key React optimization techniques:\n\n1. **React.memo()** - Prevents unnecessary re-renders\n2. **useMemo()** - Memoizes expensive calculations\n3. **useCallback()** - Memoizes functions\n4. **Code splitting** - Load components on demand\n5. **Virtualization** - For large lists',
        votes: 12,
        author: {
          id: 'u789',
          name: 'Bob Wilson',
          avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          reputation: 1456,
        },
        createdAt: '2024-01-14T18:30:00Z',
        isAccepted: true,
      }
    ],
    author: {
      id: 'u456',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      reputation: 892,
    },
    createdAt: '2024-01-14T16:45:00Z',
    hasAcceptedAnswer: true,
  },
  {
    id: 'q3',
    title: 'MySQL vs PostgreSQL: Which database to choose?',
    body: 'I\'m starting a new project and need to choose between MySQL and PostgreSQL. What are the key differences and use cases for each? The project will handle user data and needs to be scalable.',
    tags: ['mysql', 'postgresql', 'database'],
    votes: 12,
    views: 445,
    answers: [],
    author: {
      id: 'u123',
      name: 'Tom Cook',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      reputation: 1250,
    },
    createdAt: '2024-01-13T09:15:00Z',
    hasAcceptedAnswer: false,
  }
];

export const AppProvider = ({ children }) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [currentUser] = useState(mockUser);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'answer',
      message: 'Alice Johnson answered your question: "How to implement React Router?"',
      questionId: 'q1',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      read: false,
    },
    {
      id: 'n2',
      type: 'vote',
      message: 'Tom Cook upvoted your answer on: "JavaScript async/await vs Promises"',
      questionId: 'q2',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: false,
    },
    {
      id: 'n3',
      type: 'vote',
      message: 'Sarah Wilson upvoted your question: "MySQL vs PostgreSQL: Which database to choose?"',
      questionId: 'q3',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: true,
    },
  ]);

  // Load saved questions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('stackit-saved-questions');
    if (saved) {
      setSavedQuestions(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedQuestions changes
  useEffect(() => {
    localStorage.setItem('stackit-saved-questions', JSON.stringify(savedQuestions));
  }, [savedQuestions]);

  const addQuestion = (questionData) => {
    const newQuestion = {
      id: `q${Date.now()}`,
      ...questionData,
      votes: 0,
      views: 0,
      answers: [],
      author: currentUser,
      createdAt: new Date().toISOString(),
      hasAcceptedAnswer: false,
    };
    setQuestions(prev => [newQuestion, ...prev]);
    return newQuestion.id;
  };

  const addAnswer = (questionId, answerBody) => {
    const newAnswer = {
      id: `a${Date.now()}`,
      body: answerBody,
      votes: 0,
      author: currentUser,
      createdAt: new Date().toISOString(),
      isAccepted: false,
    };

    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answers: [...q.answers, newAnswer] }
        : q
    ));

    // Create notification for question author if someone else answered
    const question = questions.find(q => q.id === questionId);
    if (question && question.author.id !== currentUser.id) {
      createNotification(
        'answer',
        `${currentUser.name} answered your question: "${question.title}"`,
        questionId
      );
    }
  };

  const voteQuestion = (questionId, voteType) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, votes: q.votes + voteType }
        : q
    ));

    // Create notification for question author if someone else voted
    const question = questions.find(q => q.id === questionId);
    if (question && question.author.id !== currentUser.id && voteType > 0) {
      createNotification(
        'vote',
        `${currentUser.name} upvoted your question: "${question.title}"`,
        questionId
      );
    }
  };

  const voteAnswer = (questionId, answerId, voteType) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? {
            ...q,
            answers: q.answers.map(a => 
              a.id === answerId 
                ? { ...a, votes: a.votes + voteType }
                : a
            )
          }
        : q
    ));

    // Create notification for answer author if someone else voted
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const answer = question.answers.find(a => a.id === answerId);
      if (answer && answer.author.id !== currentUser.id && voteType > 0) {
        createNotification(
          'vote',
          `${currentUser.name} upvoted your answer on: "${question.title}"`,
          questionId
        );
      }
    }
  };

  const incrementViews = useCallback((questionId) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, views: q.views + 1 }
        : q
    ));
  }, []);

  const toggleSaveQuestion = useCallback((questionId) => {
    setSavedQuestions(prev => {
      const isAlreadySaved = prev.includes(questionId);
      if (isAlreadySaved) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  }, []);

  const getQuestionById = useCallback((id) => {
    return questions.find(q => q.id === id);
  }, [questions]);

  const getQuestionsByTag = (tag) => {
    return questions.filter(q => q.tags.includes(tag));
  };

  const getUserQuestions = (userId) => {
    return questions.filter(q => q.author.id === userId);
  };

  const getUserAnswers = (userId) => {
    const answers = [];
    questions.forEach(q => {
      q.answers.forEach(a => {
        if (a.author.id === userId) {
          answers.push({ ...a, questionTitle: q.title, questionId: q.id });
        }
      });
    });
    return answers;
  };

  const getAllTags = () => {
    const tagCounts = {};
    questions.forEach(q => {
      q.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getStats = () => {
    const totalAnswers = questions.reduce((sum, q) => sum + q.answers.length, 0);
    const tags = getAllTags();
    const mostUpvotedQuestion = questions.reduce((max, q) => 
      q.votes > (max?.votes || 0) ? q : max, null
    );

    return {
      totalQuestions: questions.length,
      totalAnswers,
      totalUsers: new Set([
        ...questions.map(q => q.author.id),
        ...questions.flatMap(q => q.answers.map(a => a.author.id))
      ]).size,
      mostUsedTag: tags[0]?.name || 'javascript',
      mostUpvotedQuestion: mostUpvotedQuestion?.title || 'No questions yet',
    };
  };

  const createNotification = useCallback((type, message, questionId = null) => {
    const notification = {
      id: `n${Date.now()}`,
      type,
      message,
      questionId,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const value = {
    currentUser,
    questions,
    savedQuestions,
    notifications,
    addQuestion,
    addAnswer,
    voteQuestion,
    voteAnswer,
    incrementViews,
    toggleSaveQuestion,
    getQuestionById,
    getQuestionsByTag,
    getUserQuestions,
    getUserAnswers,
    getAllTags,
    getStats,
    createNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};