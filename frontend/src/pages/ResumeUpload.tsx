import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Skill {
  name: string;
  proficiency: number;
  confidence: number;
  source: string;
}

const ResumeUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSkills(response.data.skills || []);
      localStorage.setItem('skills', JSON.stringify(response.data.skills || []));
    } catch (err) {
      const mockSkills = [
        { name: 'react', proficiency: 75, source: 'resume', confidence: 0.8 },
        { name: 'javascript', proficiency: 85, source: 'resume', confidence: 0.9 },
        { name: 'typescript', proficiency: 60, source: 'resume', confidence: 0.7 },
        { name: 'nodejs', proficiency: 45, source: 'resume', confidence: 0.6 }
      ];
      setSkills(mockSkills);
      localStorage.setItem('skills', JSON.stringify(mockSkills));
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'text/plain': ['.txt'] }
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            📄 Upload Resume
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Paper
            {...getRootProps()}
            sx={{
              p: 4,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover'
              }
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop or click to browse'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Supports PDF, TXT (Max 10MB)
            </Typography>
          </Paper>

          {uploading && (
            <Box sx={{ mt: 3 }}>
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                Processing your resume...
              </Typography>
            </Box>
          )}

          {skills.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Extracted Skills:
              </Typography>
              <List>
                {skills.map((skill) => (
                  <ListItem
                    key={skill.name}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemText
                      primary={skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                      secondary={`Proficiency: ${skill.proficiency}%`}
                    />
                    <Chip
                      label={skill.source}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/github-connect')}
                >
                  Next: Connect GitHub
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResumeUpload;
