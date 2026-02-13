import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // DEMO MODE - Works without backend
    setTimeout(() => {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({ 
        name: email.split('@')[0] || 'Demo User', 
        email: email 
      }));
      navigate('/dashboard');
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    setEmail('demo@skillstream.com');
    setPassword('demo123');
    setTimeout(() => handleSubmit(new Event('submit') as any), 100);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
      <Card sx={{ maxWidth: 400, width: '90%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 3 }}>
            🚀 SkillStream
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" value={email} 
              onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, py: 1.5 }}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            
            <Button fullWidth variant="outlined" onClick={handleDemoLogin} sx={{ mt: 1, py: 1.5 }}>
              Use Demo Account
            </Button>
            
            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account?{' '}
              <Link component="button" onClick={() => navigate('/signup')}>Sign up</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
