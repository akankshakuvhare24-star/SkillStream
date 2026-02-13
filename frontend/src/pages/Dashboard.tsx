import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  GitHub as GitHubIcon,
  Description as DescriptionIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  PlayCircle as PlayCircleIcon,
  EmojiEvents as EmojiEventsIcon,
  MenuBook as MenuBookIcon,
  Code as CodeIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  SmartToy as SmartToyIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility as VisibilityIcon,
  Headphones as HeadphonesIcon,
  Build as BuildIcon,
  AutoStories as AutoStoriesIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLearningStyle } from '../contexts/LearningStyleContext';

interface User {
  id: number;
  name: string;
  email: string;
  github_username?: string;
}

interface Skill {
  name: string;
  proficiency: number;
  confidence: number;
  source: string;
  last_used?: string;
}

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
  skills?: string[];
}

interface LearningPath {
  target_role: string;
  progress: number;
  total_modules: number;
  estimated_weeks: number;
  learning_style: string;
  modules: Module[];
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const { learningStyle, getRecommendedFormat } = useLearningStyle();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    try {
      // Load user
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }

      // Load skills
      const savedSkills = localStorage.getItem('skills');
      if (savedSkills) {
        setSkills(JSON.parse(savedSkills));
      }

      // Load learning path
      const savedPath = localStorage.getItem('learningPath');
      if (savedPath) {
        setPath(JSON.parse(savedPath));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setPath = (path: any) => {
    setLearningPath(path);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getTopSkills = () => {
    return skills.slice(0, 4);
  };

  const getIncompleteModules = () => {
    return learningPath?.modules?.filter(m => !m.completed).slice(0, 3) || [];
  };

  const getReadinessScore = () => {
    if (skills.length === 0) return 0;
    const avgProficiency = skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length;
    return Math.round(avgProficiency);
  };

  const getLearningStyleIcon = (style: string) => {
    switch(style?.toLowerCase()) {
      case 'visual': return <VisibilityIcon />;
      case 'auditory': return <HeadphonesIcon />;
      case 'reading': return <AutoStoriesIcon />;
      case 'kinesthetic': return <BuildIcon />;
      default: return <SchoolIcon />;
    }
  };

  const getLearningStyleColor = (style: string) => {
    switch(style?.toLowerCase()) {
      case 'visual': return '#7b1fa2'; // Purple
      case 'auditory': return '#1976d2'; // Blue
      case 'reading': return '#2e7d32'; // Green
      case 'kinesthetic': return '#ed6c02'; // Orange
      default: return '#2563eb';
    }
  };

  const getRecommendedFormats = () => {
    if (!learningStyle) return [];
    return getRecommendedFormat();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const readinessScore = getReadinessScore();
  const topSkills = getTopSkills();
  const nextModules = getIncompleteModules();
  const recommendedFormats = getRecommendedFormats();

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
      {/* Welcome Header with Learning Style */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          color: 'white',
          borderRadius: 3,
          position: 'relative'
        }}
      >
        <IconButton 
          onClick={handleRefresh} 
          sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
          disabled={refreshing}
        >
          <RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
        </IconButton>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome back, {user?.name || 'Learner'}! 👋
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
              {skills.length > 0 
                ? `You have ${skills.length} skills tracked. Your learning is optimized for your style!` 
                : 'Start by uploading your resume or connecting GitHub to begin your personalized journey.'}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {skills.length > 0 && (
                <Chip 
                  icon={<TrendingUpIcon />} 
                  label={`Readiness: ${readinessScore}%`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              )}
              {learningPath && (
                <Chip 
                  icon={<TimelineIcon />} 
                  label={`Path: ${learningPath.target_role}`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              )}
              {learningStyle && (
                <Tooltip title={`Primary: ${learningStyle.primary}, Secondary: ${learningStyle.secondary}`}>
                  <Chip 
                    icon={getLearningStyleIcon(learningStyle.primary)}
                    label={`${learningStyle.primary} Learner`}
                    sx={{ 
                      bgcolor: getLearningStyleColor(learningStyle.primary),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </Tooltip>
              )}
            </Box>

            {recommendedFormats.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  Recommended for you:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {recommendedFormats.slice(0, 3).map((format, i) => (
                    <Chip
                      key={i}
                      label={format}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '4rem' }}>
              {learningStyle?.primary === 'visual' ? '👁️' :
               learningStyle?.primary === 'auditory' ? '👂' :
               learningStyle?.primary === 'reading' ? '📚' :
               learningStyle?.primary === 'kinesthetic' ? '✋' : '🎯'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Skills Detected
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {skills.length}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
                  <SchoolIcon />
                </Avatar>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  From resume + GitHub
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Current Path
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {learningPath?.target_role || 'Not set'}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.light', width: 48, height: 48 }}>
                  <TimelineIcon />
                </Avatar>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <MenuBookIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {learningPath?.total_modules || 0} modules
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Progress
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {Math.round(learningPath?.progress || 0)}%
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.light', width: 48, height: 48 }}>
                  <TrendingUpIcon />
                </Avatar>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={learningPath?.progress || 0} 
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Learning Streak
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    7 🔥
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light', width: 48, height: 48 }}>
                  <EmojiEventsIcon />
                </Avatar>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Keep it up! +3 this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Skills Section */}
        {topSkills.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CodeIcon color="primary" /> Your Top Skills
                </Typography>
                <List>
                  {topSkills.map((skill) => (
                    <ListItem key={skill.name} sx={{ display: 'block', px: 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {skill.proficiency}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={skill.proficiency} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                          }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        Source: {skill.source} | Confidence: {Math.round(skill.confidence * 100)}%
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/skills-analysis')}
                  sx={{ mt: 1 }}
                >
                  View All Skills
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Next Modules Section */}
        {nextModules.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PlayCircleIcon color="primary" /> Next in Your Path
                </Typography>
                <List>
                  {nextModules.map((module) => (
                    <ListItem
                      key={module.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        p: 2
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          Week {module.week}: {module.title}
                        </Typography>
                        <Chip
                          size="small"
                          label={module.difficulty}
                          color={module.difficulty === 'beginner' ? 'success' : 
                                 module.difficulty === 'intermediate' ? 'primary' : 'error'}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {module.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
                        <Chip
                          size="small"
                          icon={module.format === 'video' ? <VisibilityIcon /> : 
                                module.format === 'interactive' ? <BuildIcon /> : 
                                <MenuBookIcon />}
                          label={module.format}
                          variant="outlined"
                        />
                        <Chip
                          size="small"
                          label={`${module.duration} min`}
                          variant="outlined"
                        />
                        <Box sx={{ flex: 1 }} />
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => navigate(`/module/${module.id}`)}
                        >
                          Start
                        </Button>
                      </Box>
                      {module.progress > 0 && (
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={module.progress} 
                            sx={{ height: 4, borderRadius: 2 }}
                          />
                        </Box>
                      )}
                    </ListItem>
                  ))}
                </List>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/learning-path')}
                  sx={{ mt: 1 }}
                >
                  View Full Path
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Learning Style Recommendations */}
        {learningStyle && (
          <Grid item xs={12}>
            <Card sx={{ bgcolor: getLearningStyleColor(learningStyle.primary) + '10' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: getLearningStyleColor(learningStyle.primary) }}>
                    {getLearningStyleIcon(learningStyle.primary)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      Learning Optimized for You
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Based on your {learningStyle.primary} learning style, we recommend:
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  {recommendedFormats.map((format, i) => (
                    <Grid item xs={6} sm={3} key={i}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.paper' }}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                          {format === 'video' ? '🎥' :
                           format === 'podcast' ? '🎧' :
                           format === 'article' ? '📄' :
                           format === 'interactive' ? '🖱️' :
                           format === 'book' ? '📚' :
                           format === 'practice' ? '💻' : '📖'}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {format}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlayCircleIcon color="primary" /> Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    onClick={() => navigate('/resume-upload')}
                    sx={{ py: 1.5 }}
                  >
                    Upload Resume
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    onClick={() => navigate('/github-connect')}
                    sx={{ py: 1.5 }}
                  >
                    Connect GitHub
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SchoolIcon />}
                    onClick={() => navigate('/learning-style')}
                    sx={{ py: 1.5 }}
                  >
                    {learningStyle ? 'Retake Quiz' : 'Learning Style'}
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<SmartToyIcon />}
                    onClick={() => navigate('/chatbot')}
                    sx={{ py: 1.5 }}
                  >
                    AI Assistant
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color="primary" /> Recent Activity
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Completed React Hooks module" 
                    secondary="2 hours ago • Score: 85%"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Learning style assessed" 
                    secondary={`Yesterday • ${learningStyle?.primary} learner`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemIcon>
                    <GitHubIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="GitHub connected" 
                    secondary="2 days ago • 15 repositories analyzed"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

