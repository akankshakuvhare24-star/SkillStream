import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Chip,
  LinearProgress,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Import components
import PuzzleProgress from '../components/PuzzleProgress';
import Certificate from '../components/Certificate';

// Types
interface Module {
  id: number;
  week: number;
  title: string;
  description: string;
  difficulty: string;
  format: string;
  duration: number;
  completed: boolean;
  progress: number;
}

interface LearningPathData {
  target_role: string;
  progress: number;
  total_modules: number;
  estimated_weeks: number;
  learning_style: string;
  modules: Module[];
}

// Main Component
const LearningPath: React.FC = () => {
  const [path, setPath] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState('Learner');
  const [puzzlePieces, setPuzzlePieces] = useState<Array<{
    id: string;
    name: string;
    completed: boolean;
    icon: string;
  }>>([]);
  
  const navigate = useNavigate();

  // Load data on mount
  useEffect(() => {
    // Get user name
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name || 'Learner');
      } catch {
        // Ignore parse error
      }
    }
    
    loadPath();
  }, []);

  // Load learning path
  const loadPath = () => {
    try {
      // Try to get from localStorage
      const saved = localStorage.getItem('learningPath');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPath(parsed);
        
        // Create puzzle pieces
        const pieces = (parsed.modules || []).map((module: Module, index: number) => ({
          id: module.id.toString(),
          name: module.title,
          completed: module.completed || false,
          icon: ['📘', '📗', '📕', '📙', '📓', '📔', '📒', '📚'][index % 8]
        }));
        setPuzzlePieces(pieces);
      } else {
        // Create demo path
        const demoPath: LearningPathData = {
          target_role: 'Full Stack Developer',
          progress: 45,
          total_modules: 6,
          estimated_weeks: 6,
          learning_style: 'visual',
          modules: [
            { 
              id: 1, 
              week: 1, 
              title: 'JavaScript Fundamentals', 
              description: 'Master core JavaScript concepts including ES6+, async programming, and modern features.',
              difficulty: 'beginner', 
              format: 'video', 
              duration: 45, 
              completed: true, 
              progress: 100
            },
            { 
              id: 2, 
              week: 2, 
              title: 'React Basics', 
              description: 'Learn React components, props, state, and hooks through hands-on projects.',
              difficulty: 'beginner', 
              format: 'interactive', 
              duration: 60, 
              completed: true, 
              progress: 100
            },
            { 
              id: 3, 
              week: 3, 
              title: 'Advanced React Patterns', 
              description: 'Explore advanced React patterns, performance optimization, and best practices.',
              difficulty: 'intermediate', 
              format: 'video', 
              duration: 50, 
              completed: false, 
              progress: 60
            },
            { 
              id: 4, 
              week: 4, 
              title: 'Node.js & Express', 
              description: 'Build backend APIs with Node.js and Express framework.',
              difficulty: 'intermediate', 
              format: 'article', 
              duration: 40, 
              completed: false, 
              progress: 20
            },
            { 
              id: 5, 
              week: 5, 
              title: 'Database Integration', 
              description: 'Work with PostgreSQL and MongoDB in your applications.',
              difficulty: 'intermediate', 
              format: 'interactive', 
              duration: 55, 
              completed: false, 
              progress: 0
            },
            { 
              id: 6, 
              week: 6, 
              title: 'Docker & DevOps Basics', 
              description: 'Containerize your applications and learn DevOps fundamentals.',
              difficulty: 'advanced', 
              format: 'video', 
              duration: 50, 
              completed: false, 
              progress: 0
            }
          ]
        };
        setPath(demoPath);
        
        // Create puzzle pieces for demo
        const pieces = demoPath.modules.map((module, index) => ({
          id: module.id.toString(),
          name: module.title,
          completed: module.completed,
          icon: ['📘', '📗', '📕', '📙', '📓', '📔', '📒', '📚'][index % 8]
        }));
        setPuzzlePieces(pieces);
      }
    } catch {
      setError('Failed to load learning path');
    } finally {
      setLoading(false);
    }
  };

  // Mark module as complete
  const handleModuleComplete = (moduleId: number) => {
    if (!path) return;
    
    const updatedModules = path.modules.map(module => 
      module.id === moduleId ? { ...module, completed: true, progress: 100 } : module
    );
    
    const completedCount = updatedModules.filter(m => m.completed).length;
    const newProgress = (completedCount / updatedModules.length) * 100;
    
    const updatedPath = {
      ...path,
      modules: updatedModules,
      progress: newProgress
    };
    
    setPath(updatedPath);
    localStorage.setItem('learningPath', JSON.stringify(updatedPath));
    
    setPuzzlePieces(prev => 
      prev.map(piece => 
        piece.id === moduleId.toString() 
          ? { ...piece, completed: true } 
          : piece
      )
    );
  };

  // Handle puzzle piece click
  const handlePuzzleClick = (pieceId: string) => {
    navigate(`/module/${pieceId}`);
  };

  // Get icon for format
  const getIconForFormat = (format: string): string => {
    switch(format) {
      case 'video': return '🎥';
      case 'interactive': return '🖱️';
      case 'article': return '📄';
      case 'practice': return '💻';
      default: return '📚';
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string): "success" | "primary" | "error" | "default" => {
    switch(difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'primary';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="info">{error}</Alert>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/skills-analysis')}>
          Generate New Path
        </Button>
      </Box>
    );
  }

  const allCompleted = puzzlePieces.every(p => p.completed);

  return (
    <Box sx={{ p: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      
      {/* Celebration Header */}
      {allCompleted && (
        <Paper 
          sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            color: 'white',
            borderRadius: 4,
            textAlign: 'center',
            animation: 'pulse 2s infinite'
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            🎉 CONGRATULATIONS! 🎉
          </Typography>
          <Typography variant="h5">
            You've completed all modules! Claim your certificate below.
          </Typography>
        </Paper>
      )}

      {/* Title */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        🗺️ Your Learning Path: {path?.target_role}
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h4">{path?.estimated_weeks}</Typography>
            <Typography variant="body2">Estimated Weeks</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
            <Typography variant="h4">{path?.total_modules}</Typography>
            <Typography variant="body2">Learning Modules</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light', color: 'white' }}>
            <Typography variant="h4">{path?.learning_style}</Typography>
            <Typography variant="body2">Learning Style</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Progress Bar */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">Overall Progress</Typography>
            <Typography variant="h6">{Math.round(path?.progress || 0)}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={path?.progress || 0} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </CardContent>
      </Card>

      {/* Puzzle Progress */}
      <Box sx={{ mb: 4 }}>
        <PuzzleProgress 
          pieces={puzzlePieces}
          onPieceClick={handlePuzzleClick}
        />
      </Box>

      {/* Certificate Button */}
      {allCompleted && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowCertificate(true)}
            sx={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: 'white',
              fontSize: '1.3rem',
              py: 2,
              px: 6,
              borderRadius: 50,
              animation: 'pulse 2s infinite',
              '&:hover': {
                background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <EmojiEventsIcon sx={{ mr: 2, fontSize: 30 }} />
            CLAIM YOUR CERTIFICATE
            <EmojiEventsIcon sx={{ ml: 2, fontSize: 30 }} />
          </Button>
        </Box>
      )}

      {/* Learning Modules */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Learning Modules
      </Typography>

      <Stepper orientation="vertical">
        {path?.modules.map((module) => (
          <Step key={module.id} active={!module.completed}>
            <StepLabel
              StepIconComponent={() => (
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: module.completed ? 'success.main' : 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}
                >
                  {module.completed ? '✓' : module.week}
                </Box>
              )}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h6">Week {module.week}: {module.title}</Typography>
                <Chip 
                  size="small" 
                  label={module.difficulty}
                  color={getDifficultyColor(module.difficulty)}
                />
                <Chip 
                  size="small" 
                  label={`${getIconForFormat(module.format)} ${module.format}`}
                  variant="outlined"
                />
                <Chip 
                  size="small" 
                  icon={<ScheduleIcon />} 
                  label={`${module.duration} min`}
                  variant="outlined"
                />
              </Box>
            </StepLabel>
            <StepContent>
              <Paper sx={{ p: 3, bgcolor: '#f8f9ff', mb: 2 }}>
                <Typography variant="body1" paragraph>
                  {module.description}
                </Typography>

                {module.progress > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">Module Progress</Typography>
                      <Typography variant="body2">{module.progress}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={module.progress} 
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={module.completed ? <CheckCircleIcon /> : <PlayCircleIcon />}
                    onClick={() => navigate(`/module/${module.id}`)}
                  >
                    {module.completed ? 'Review Module' : 'Start Module'}
                  </Button>
                  
                  {!module.completed && (
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleModuleComplete(module.id)}
                    >
                      Mark as Complete
                    </Button>
                  )}
                </Box>
              </Paper>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button variant="outlined" onClick={() => navigate('/skills-analysis')}>
          Back to Analysis
        </Button>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </Box>

      {/* Certificate Modal */}
      <Certificate
        open={showCertificate}
        onClose={() => setShowCertificate(false)}
        userName={userName}
        courseName={path?.target_role || 'Full Stack Development'}
        date={new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
        skills={path?.modules?.map(m => m.title) || []}
      />

      {/* Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default LearningPath;

