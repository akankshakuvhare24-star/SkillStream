import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  FormControl,
  Button,
  LinearProgress,
  Paper,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
}

interface LearningStyleResult {
  primary: string;
  secondary: string;
  scores: Record<string, number>;
}

const questions: Question[] = [
  {
    id: 1,
    text: "When learning a new programming concept, you prefer to:",
    options: [
      { value: "visual", label: "Watch video tutorials with diagrams and animations", icon: <VisibilityIcon /> },
      { value: "auditory", label: "Listen to explanations or podcasts", icon: <HeadphonesIcon /> },
      { value: "reading", label: "Read documentation and articles", icon: <MenuBookIcon /> },
      { value: "kinesthetic", label: "Try coding it yourself immediately", icon: <BuildIcon /> }
    ]
  },
  {
    id: 2,
    text: "When debugging code, you:",
    options: [
      { value: "visual", label: "Draw flowcharts or visualize the data flow", icon: <VisibilityIcon /> },
      { value: "auditory", label: "Talk through the problem out loud", icon: <HeadphonesIcon /> },
      { value: "reading", label: "Read error messages and documentation carefully", icon: <MenuBookIcon /> },
      { value: "kinesthetic", label: "Try different solutions until it works", icon: <BuildIcon /> }
    ]
  },
  {
    id: 3,
    text: "When studying documentation, you prefer:",
    options: [
      { value: "visual", label: "Diagrams, screenshots, and code snippets", icon: <VisibilityIcon /> },
      { value: "auditory", label: "Video explanations or discussions", icon: <HeadphonesIcon /> },
      { value: "reading", label: "Detailed text with examples", icon: <MenuBookIcon /> },
      { value: "kinesthetic", label: "Interactive examples you can modify", icon: <BuildIcon /> }
    ]
  },
  {
    id: 4,
    text: "How do you best remember a new function or method?",
    options: [
      { value: "visual", label: "By seeing its syntax highlighted in examples", icon: <VisibilityIcon /> },
      { value: "auditory", label: "By hearing someone explain it", icon: <HeadphonesIcon /> },
      { value: "reading", label: "By writing it down in my notes", icon: <MenuBookIcon /> },
      { value: "kinesthetic", label: "By using it in a project", icon: <BuildIcon /> }
    ]
  },
  {
    id: 5,
    text: "When starting a new technology, you:",
    options: [
      { value: "visual", label: "Watch a tutorial or screencast first", icon: <VisibilityIcon /> },
      { value: "auditory", label: "Find a podcast or lecture about it", icon: <HeadphonesIcon /> },
      { value: "reading", label: "Read the official documentation", icon: <MenuBookIcon /> },
      { value: "kinesthetic", label: "Clone a sample project and experiment", icon: <BuildIcon /> }
    ]
  }
];

const LearningStyleQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<LearningStyleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    setLoading(true);
    
    const scores = {
      visual: 0,
      auditory: 0,
      reading: 0,
      kinesthetic: 0
    };

    Object.values(answers).forEach(answer => {
      if (answer === 'visual') scores.visual += 20;
      else if (answer === 'auditory') scores.auditory += 20;
      else if (answer === 'reading') scores.reading += 20;
      else if (answer === 'kinesthetic') scores.kinesthetic += 20;
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];
    const secondary = sorted[1][0];

    const result: LearningStyleResult = {
      primary,
      secondary,
      scores
    };

    localStorage.setItem('learningStyle', JSON.stringify(result));
    
    setTimeout(() => {
      setResult(result);
      setLoading(false);
    }, 1000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (result) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
          Back to Dashboard
        </Button>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              🎉 Your Learning Style Results!
            </Typography>
            <Box sx={{ my: 4, textAlign: 'center' }}>
              <Chip
                icon={<SchoolIcon />}
                label={`Primary: ${result.primary.toUpperCase()}`}
                color="primary"
                sx={{ fontSize: '1.2rem', m: 1 }}
              />
              <Chip
                label={`Secondary: ${result.secondary.toUpperCase()}`}
                variant="outlined"
                color="secondary"
                sx={{ fontSize: '1.2rem', m: 1 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
              <Button variant="outlined" onClick={() => {
                setResult(null);
                setCurrentQuestion(0);
                setAnswers({});
              }}>
                Retake Quiz
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            🧠 Discover Your Learning Style
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Answer 5 questions to personalize your learning experience
          </Typography>

          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 10, borderRadius: 5, mb: 4 }}
          />

          <Typography variant="h6" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
            {questions[currentQuestion].text}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            {questions[currentQuestion].options.map((option) => (
              <Paper
                key={option.value}
                sx={{
                  mb: 2,
                  border: '2px solid',
                  borderColor: answers[questions[currentQuestion].id] === option.value ? 'primary.main' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.light',
                    bgcolor: 'action.hover'
                  }
                }}
                onClick={() => handleAnswer(option.value)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                  <Radio checked={answers[questions[currentQuestion].id] === option.value} />
                  <Box sx={{ color: 'primary.main' }}>{option.icon}</Box>
                  <Typography>{option.label}</Typography>
                </Box>
              </Paper>
            ))}
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={calculateResult}
                disabled={Object.keys(answers).length < questions.length || loading}
              >
                {loading ? 'Analyzing...' : 'See Results'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion].id]}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LearningStyleQuiz;
