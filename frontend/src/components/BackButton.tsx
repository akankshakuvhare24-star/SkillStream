import React from 'react';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, label = 'Back' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        variant="text"
        color="primary"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.04)'
          }
        }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default BackButton;