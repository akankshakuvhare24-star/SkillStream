import React from 'react';
import { Box, Typography, Paper, Tooltip } from '@mui/material';

interface PuzzlePiece {
  id: string;
  name: string;
  completed: boolean;
  icon: string;
}

interface PuzzleProgressProps {
  pieces: PuzzlePiece[];
  onPieceClick?: (id: string) => void;
}

const PuzzleProgress: React.FC<PuzzleProgressProps> = ({ pieces, onPieceClick }) => {
  const completedCount = pieces.filter(p => p.completed).length;
  const totalCount = pieces.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <Paper sx={{ p: 3, bgcolor: '#f8f9ff', borderRadius: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        🧩 Your Learning Puzzle {completedCount}/{totalCount} Complete
      </Typography>

      {/* Progress Bar */}
      <Box
        sx={{
          width: '100%',
          height: 20,
          bgcolor: '#e0e0e0',
          borderRadius: 10,
          mb: 3,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.5s ease-in-out',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 4,
              height: '100%',
              bgcolor: 'white',
              animation: 'pulse 1s infinite'
            }
          }}
        />
      </Box>

      {/* Puzzle Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: 2,
          perspective: 1000
        }}
      >
        {pieces.map((piece) => (
          <Tooltip key={piece.id} title={piece.name}>
            <Box
              onClick={() => onPieceClick?.(piece.id)}
              sx={{
                aspectRatio: '1',
                bgcolor: piece.completed ? 'success.main' : 'grey.300',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                cursor: 'pointer',
                transform: piece.completed ? 'rotateY(180deg)' : 'none',
                transition: 'all 0.5s',
                transformStyle: 'preserve-3d',
                position: 'relative',
                boxShadow: piece.completed ? '0 10px 20px rgba(76, 175, 80, 0.3)' : 'none',
                '&:hover': {
                  transform: piece.completed ? 'rotateY(180deg) scale(1.05)' : 'scale(1.05)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                },
                ...(piece.completed && {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent)',
                    borderRadius: 3
                  }
                })
              }}
            >
              {piece.completed ? '🎉' : piece.icon}
            </Box>
          </Tooltip>
        ))}
      </Box>

      {/* Completion Message */}
      {completedCount === totalCount && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: 'success.light',
            borderRadius: 2,
            textAlign: 'center',
            animation: 'bounce 0.5s'
          }}
        >
          <Typography variant="h6" color="success.dark">
            🎉 CONGRATULATIONS! Puzzle Complete! 🎉
          </Typography>
          <Typography variant="body2">
            You've mastered all skills! Claim your certificate below.
          </Typography>
        </Box>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
    </Paper>
  );
};

export default PuzzleProgress;