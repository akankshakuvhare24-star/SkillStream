import React, { useState } from 'react';
import {
  Box, Card, CardContent, TextField, Button, Typography, Link, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/signup', { name, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
      <Card sx={{ maxWidth: 400, width: '90%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
            🚀 SkillStream
          </Typography>
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3 }}>
            Create Account
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Full Name" value={name}
              onChange={(e) => setName(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <Button type="submit" fullWidth variant="contained" size="large" 
              disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
            <Typography align="center">
              Already have an account?{' '}
              <Link component="button" onClick={() => navigate('/login')} sx={{ fontWeight: 'bold' }}>
                Login
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
