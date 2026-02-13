import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) return <LinearProgress />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Welcome back, {user?.name || 'Learner'}! 👋
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Your personalized learning journey starts here.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', bgcolor: '#2563eb', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Get Started</Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Take the learning style quiz to personalize your experience.
              </Typography>
              <Button 
                variant="contained" 
                sx={{ bgcolor: 'white', color: '#2563eb', '&:hover': { bgcolor: '#f8fafc' } }}
                onClick={() => navigate('/learning-style')}
              >
                Start Quiz →
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>📄 Upload Resume</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Extract your skills automatically.
              </Typography>
              <Button variant="outlined" onClick={() => navigate('/resume-upload')}>
                Upload Resume
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>🐙 Connect GitHub</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Analyze your code and contributions.
              </Typography>
              <Button variant="outlined" onClick={() => navigate('/github-connect')}>
                Connect GitHub
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
