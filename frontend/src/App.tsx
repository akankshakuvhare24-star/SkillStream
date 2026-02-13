import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LearningStyleProvider } from './contexts/LearningStyleContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import LearningStyleQuiz from './pages/LearningStyleQuiz';
import ResumeUpload from './pages/ResumeUpload';
import GithubConnect from './pages/GithubConnect';
import SkillsAnalysis from './pages/SkillsAnalysis';
import LearningPath from './pages/LearningPath';
import ModuleViewer from './pages/ModuleViewer';
import Chatbot from './pages/Chatbot';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#9ba9f0',
      dark: '#4a5fd5',
    },
    secondary: {
      main: '#764ba2',
      light: '#9b6fc7',
      dark: '#5a3780',
    },
    background: {
      default: '#f8f9ff',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          borderRadius: 12,
        },
        contained: {
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <LearningStyleProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/learning-style" element={
            <ProtectedRoute>
              <LearningStyleQuiz />
            </ProtectedRoute>
          } />
          <Route path="/resume-upload" element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          } />
          <Route path="/github-connect" element={
            <ProtectedRoute>
              <GithubConnect />
            </ProtectedRoute>
          } />
          <Route path="/skills-analysis" element={
            <ProtectedRoute>
              <SkillsAnalysis />
            </ProtectedRoute>
          } />
          <Route path="/learning-path" element={
            <ProtectedRoute>
              <LearningPath />
            </ProtectedRoute>
          } />
          <Route path="/module/:id" element={
            <ProtectedRoute>
              <ModuleViewer />
            </ProtectedRoute>
          } />
          <Route path="/chatbot" element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          } />
          
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        </LearningStyleProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

