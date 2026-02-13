import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Skill {
  name: string;
  proficiency: number;
  confidence: number;
  source: string;
}

interface Gap {
  skill: string;
  current: number;
  required: number;
  gap: number;
  priority: string;
  score: number;
}

interface GapAnalysis {
  role: string;
  role_key: string;
  total_gap_score: number;
  gaps: Gap[];
  readiness: number;
}

const SkillsAnalysis: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [targetRole, setTargetRole] = useState('fullstack_developer');
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingSkills, setFetchingSkills] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const roles = [
    { value: 'frontend_developer', label: 'Frontend Developer' },
    { value: 'backend_developer', label: 'Backend Developer' },
    { value: 'fullstack_developer', label: 'Full Stack Developer' },
    { value: 'devops_engineer', label: 'DevOps Engineer' }
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setFetchingSkills(true);
      const response = await api.get('/api/resume/skills');
      setSkills(response.data.skills || []);
    } catch (err) {
      setError('Failed to fetch skills');
    } finally {
      setFetchingSkills(false);
    }
  };

  const analyzeGaps = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/gap/analyze', { role_key: targetRole });
      setGapAnalysis(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const generatePath = async () => {
    setLoading(true);
    try {
      await api.post('/api/gap/generate-path', { role_key: targetRole });
      navigate('/learning-path');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Path generation failed');
    } finally {
      setLoading(false);
    }
  };

  const chartData = skills.slice(0, 6).map(s => ({
    skill: s.name.charAt(0).toUpperCase() + s.name.slice(1),
    value: s.proficiency
  }));

  if (fetchingSkills) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        📊 Skill Gap Analysis
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                🎯 Select Target Role
              </Typography>
              
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Role</InputLabel>
                <Select 
                  value={targetRole} 
                  onChange={(e) => setTargetRole(e.target.value)}
                  label="Role"
                >
                  {roles.map(role => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 3 }}
                onClick={analyzeGaps}
                disabled={loading || skills.length === 0}
              >
                {loading ? 'Analyzing...' : 'Analyze Gaps'}
              </Button>

              {skills.length === 0 && (
                <Paper sx={{ p: 2, mt: 3, bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                  <Typography variant="body2">
                    No skills found. Please upload your resume first.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ mt: 1, bgcolor: 'white' }}
                    onClick={() => navigate('/resume-upload')}
                  >
                    Upload Resume
                  </Button>
                </Paper>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Skill Profile
              </Typography>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <Radar 
                      name="Skills" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      fill="#2563eb" 
                      fillOpacity={0.6} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    No skills to display
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {gapAnalysis && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📋 Skill Gaps for {gapAnalysis.role}
                  </Typography>
                  <Chip 
                    label={`Readiness: ${gapAnalysis.readiness}%`} 
                    color={gapAnalysis.readiness > 70 ? 'success' : gapAnalysis.readiness > 40 ? 'warning' : 'error'}
                  />
                </Box>
                
                <Grid container spacing={2}>
                  {gapAnalysis.gaps.map((gap) => (
                    <Grid item xs={12} key={gap.skill}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {gap.skill.charAt(0).toUpperCase() + gap.skill.slice(1)}
                          </Typography>
                          <Chip 
                            label={gap.priority} 
                            size="small"
                            color={gap.priority === 'high' ? 'error' : gap.priority === 'medium' ? 'warning' : 'success'}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Current: {gap.current}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Required: {gap.required}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Gap: {gap.gap}%
                          </Typography>
                        </Box>
                        
                        <LinearProgress 
                          variant="determinate" 
                          value={gap.current} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: '#eee',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: gap.gap > 30 ? '#ef4444' : gap.gap > 15 ? '#f59e0b' : '#10b981'
                            }
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 3 }}
                  onClick={generatePath}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Learning Path'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SkillsAnalysis;