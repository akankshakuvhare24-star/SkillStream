import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Paper
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import html2canvas from 'html2canvas';

interface CertificateProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  courseName: string;
  date: string;
  skills: string[];
}

const Certificate: React.FC<CertificateProps> = ({
  open,
  onClose,
  userName,
  courseName,
  date,
  skills
}) => {
  const certificateRef = React.useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `${courseName}-certificate.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        {/* Certificate Design */}
        <Box
          ref={certificateRef}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.1
            }
          }}
        >
          {/* Gold Seal */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffd700 0%, #ffa500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: '3px solid rgba(255,215,0,0.5)',
                animation: 'pulse 2s infinite'
              }
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 50, color: 'white' }} />
          </Box>

          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Certificate of Completion
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, opacity: 0.9 }}>
            This is proudly presented to
          </Typography>

          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {userName}
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            For successfully completing
          </Typography>

          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#ffd700', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {courseName}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
            {skills.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  borderRadius: 5,
                  border: '1px solid rgba(255,255,255,0.5)'
                }}
              >
                <Typography variant="body1">🏆 {skill}</Typography>
              </Box>
            ))}
          </Box>

          <Typography variant="h6" sx={{ mb: 4 }}>
            Awarded on {date}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">__________________</Typography>
              <Typography variant="body2">Instructor Signature</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">__________________</Typography>
              <Typography variant="body2">SkillStream Seal</Typography>
            </Box>
          </Box>

          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 0.5; }
              }
            `}
          </style>
        </Box>

        {/* Download Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadCertificate}
            size="large"
          >
            Download Certificate
          </Button>
          <Button variant="outlined" onClick={onClose} size="large">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Certificate;