import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  embedUrl: string;
}

interface Module {
  id: number;
  title: string;
  skill: string;
  description: string;
  difficulty: string;
  duration: number;
}

// Pre-curated videos
const topicVideos: Record<string, Video[]> = {
  react: [
    {
      id: 'bMknfKXIFA8',
      title: 'React Course - Beginner\'s Tutorial (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '10:00:00',
      embedUrl: 'https://www.youtube.com/embed/bMknfKXIFA8'
    },
    {
      id: 'DLX62G4lc44',
      title: 'React JS Crash Course (Traversy Media)',
      channel: 'Traversy Media',
      duration: '1:48:00',
      embedUrl: 'https://www.youtube.com/embed/DLX62G4lc44'
    }
  ],
  javascript: [
    {
      id: 'jS4aFq5-91M',
      title: 'JavaScript Programming - Full Course (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '8:00:00',
      embedUrl: 'https://www.youtube.com/embed/jS4aFq5-91M'
    },
    {
      id: 'hdI2bqOjy3c',
      title: 'JavaScript Crash Course (Traversy Media)',
      channel: 'Traversy Media',
      duration: '1:40:00',
      embedUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c'
    }
  ],
  python: [
    {
      id: 'rfscVS0vtbw',
      title: 'Python Tutorial for Beginners (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '4:40:00',
      embedUrl: 'https://www.youtube.com/embed/rfscVS0vtbw'
    }
  ],
  node: [
    {
      id: 'Oe421EPjeBE',
      title: 'Node.js / Express Course (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '8:00:00',
      embedUrl: 'https://www.youtube.com/embed/Oe421EPjeBE'
    }
  ],
  docker: [
    {
      id: 'fqMOX6JJhGo',
      title: 'Docker Tutorial (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '4:00:00',
      embedUrl: 'https://www.youtube.com/embed/fqMOX6JJhGo'
    }
  ]
};

const ModuleViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const navigate = useNavigate();

  // Module data
  const modules: Record<string, Module> = {
    '1': { id: 1, title: 'React Hooks Deep Dive', skill: 'react', description: 'Master useState, useEffect, useContext and custom hooks', difficulty: 'intermediate', duration: 60 },
    '2': { id: 2, title: 'JavaScript Fundamentals', skill: 'javascript', description: 'Modern JavaScript ES6+ features and concepts', difficulty: 'beginner', duration: 45 },
    '3': { id: 3, title: 'Advanced React Patterns', skill: 'react', description: 'Learn advanced patterns like render props, HOCs, and compound components', difficulty: 'advanced', duration: 75 },
    '4': { id: 4, title: 'Node.js & Express', skill: 'node', description: 'Build REST APIs with Node.js and Express', difficulty: 'intermediate', duration: 60 },
    '5': { id: 5, title: 'Python Programming', skill: 'python', description: 'Learn Python from basics to advanced', difficulty: 'beginner', duration: 90 },
    '6': { id: 6, title: 'Docker Containers', skill: 'docker', description: 'Containerize your applications with Docker', difficulty: 'intermediate', duration: 50 },
  };

  useEffect(() => {
    const moduleData = modules[id || '1'];
    if (moduleData) {
      setModule(moduleData);
      const topic = moduleData.skill.toLowerCase();
      const topicVid = topicVideos[topic] || topicVideos.react;
      setVideos(topicVid);
      setSelectedVideo(topicVid[0]);
    }
  }, [id]);

  if (!module) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Module not found</Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => navigate('/learning-path')}>
          Back to Learning Path
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/learning-path')} sx={{ mb: 2 }}>
        Back to Learning Path
      </Button>
      
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {module.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Chip label={module.skill} color="primary" />
        <Chip label={module.difficulty} color={module.difficulty === 'beginner' ? 'success' : 'warning'} />
        <Chip icon={<AccessTimeIcon />} label={`${module.duration} min`} variant="outlined" />
      </Box>

      {/* Video Player */}
      {selectedVideo && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {selectedVideo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Channel: {selectedVideo.channel} • Duration: {selectedVideo.duration}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Video Playlist */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <YouTubeIcon color="error" /> More Videos
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {videos.map((video, index) => (
                    <React.Fragment key={video.id}>
                      <Paper
                        sx={{
                          p: 1,
                          mb: 1,
                          cursor: 'pointer',
                          bgcolor: selectedVideo.id === video.id ? 'action.selected' : 'transparent',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                        onClick={() => setSelectedVideo(video)}
                      >
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <YouTubeIcon color="error" sx={{ fontSize: 30 }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {video.title.length > 50 ? video.title.substring(0, 50) + '...' : video.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {video.channel} • {video.duration}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                      {index < videos.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Module Description */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About this Module
                </Typography>
                <Typography variant="body1" paragraph>
                  {module.description}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PlayCircleIcon />}
                  onClick={() => navigate('/learning-path')}
                >
                  Mark as Completed
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ModuleViewer;
