import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

import LandingPage from './pages/Landingpage';
import HomePage from './pages/HomePage';
import AskQuestionPage from './pages/AskQuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import TagsPage from './pages/TagsPage';
import TagDetailPage from './pages/TagDetailPage';
import ProfilePage from './pages/ProfilePage';
import SavedPage from './pages/SavedPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<HomePage />} />
            <Route path="/ask" element={<AskQuestionPage />} />
            <Route path="/question/:id" element={<QuestionDetailPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/tags/:tagName" element={<TagDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
