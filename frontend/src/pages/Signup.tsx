import React, { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // DEMO MODE - Works without backend
    setTimeout(() => {
      navigate('/login');
      setLoading(false);
    }, 500);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
      <Card sx={{ maxWidth: 400, width: '90%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#2563eb', mb: 3 }}>
            🚀 SkillStream
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Full Name" value={name}
              onChange={(e) => setName(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, py: 1.5 }}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
            
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link component="button" onClick={() => navigate('/login')}>Login</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
