import React, { createContext, useContext, useEffect, useState } from 'react';

// Define proper types
export interface LearningStyleType {
  primary: string;
  secondary: string;
  scores: Record<string, number>;
}

interface LearningStyleContextType {
  learningStyle: LearningStyleType | null;
  setLearningStyle: (style: LearningStyleType) => void;
  getPriorityOrder: <T extends { type: string }>(items: T[]) => T[];
  getRecommendedFormat: () => string[];
  getContentFilter: () => Record<string, number>;
}

const LearningStyleContext = createContext<LearningStyleContextType | undefined>(undefined);

export const useLearningStyle = () => {
  const context = useContext(LearningStyleContext);
  if (!context) {
    throw new Error('useLearningStyle must be used within LearningStyleProvider');
  }
  return context;
};

export const LearningStyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [learningStyle, setLearningStyle] = useState<LearningStyleType | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('learningStyle');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure the parsed object has the correct shape
        if (parsed && typeof parsed === 'object' && 'primary' in parsed && 'secondary' in parsed) {
          setLearningStyle(parsed as LearningStyleType);
        }
      } catch (e) {
        console.error('Failed to parse learning style:', e);
      }
    }
  }, []);

  // Type-safe style scores
  const styleScores: Record<string, Record<string, number>> = {
    visual: {
      video: 1.0,
      interactive: 0.8,
      article: 0.5,
      practice: 0.6,
      documentation: 0.5,
      course: 0.7,
      tutorial: 0.7
    },
    auditory: {
      video: 0.9,
      interactive: 0.6,
      article: 0.5,
      practice: 0.5,
      documentation: 0.4,
      course: 0.8,
      tutorial: 0.7,
      podcast: 1.0,
      lecture: 1.0
    },
    reading: {
      video: 0.4,
      interactive: 0.6,
      article: 1.0,
      practice: 0.5,
      documentation: 1.0,
      course: 0.8,
      book: 1.0,
      tutorial: 0.9
    },
    kinesthetic: {
      video: 0.5,
      interactive: 1.0,
      article: 0.4,
      practice: 1.0,
      documentation: 0.5,
      course: 0.7,
      tutorial: 0.6,
      project: 1.0,
      lab: 1.0
    }
  };

  // Get priority order based on learning style
  const getPriorityOrder = <T extends { type: string }>(items: T[]): T[] => {
    if (!learningStyle || !items.length) return items;

    const primaryScores = styleScores[learningStyle.primary] || {};
    const secondaryScores = styleScores[learningStyle.secondary] || {};

    return [...items].sort((a, b) => {
      const scoreA = (primaryScores[a.type] || 0.5) * 0.7 + (secondaryScores[a.type] || 0.3) * 0.3;
      const scoreB = (primaryScores[b.type] || 0.5) * 0.7 + (secondaryScores[b.type] || 0.3) * 0.3;
      return scoreB - scoreA;
    });
  };

  // Get recommended content formats
  const getRecommendedFormat = (): string[] => {
    if (!learningStyle) return ['video', 'article', 'interactive', 'practice'];

    const recommendations: Record<string, string[]> = {
      visual: ['video', 'interactive', 'documentation with diagrams', 'screencasts', 'infographics'],
      auditory: ['podcast', 'video with narration', 'lecture', 'discussion', 'audio book'],
      reading: ['article', 'book', 'documentation', 'written tutorial', 'blog post'],
      kinesthetic: ['interactive', 'practice', 'project', 'coding challenge', 'lab', 'workshop']
    };

    const primary = recommendations[learningStyle.primary] || [];
    const secondary = recommendations[learningStyle.secondary] || [];
    
    return [...new Set([...primary, ...secondary])].slice(0, 4);
  };

  // Get content type filter weights
  const getContentFilter = (): Record<string, number> => {
    if (!learningStyle) {
      return { video: 1, article: 1, interactive: 1, practice: 1 };
    }

    const weights: Record<string, Record<string, number>> = {
      visual: { video: 1.5, article: 0.7, interactive: 1.2, practice: 0.8 },
      auditory: { video: 1.3, article: 0.6, interactive: 0.8, practice: 0.7 },
      reading: { video: 0.6, article: 1.5, interactive: 0.8, practice: 0.7 },
      kinesthetic: { video: 0.7, article: 0.6, interactive: 1.5, practice: 1.5 }
    };

    return weights[learningStyle.primary] || { video: 1, article: 1, interactive: 1, practice: 1 };
  };

  const value: LearningStyleContextType = {
    learningStyle,
    setLearningStyle,
    getPriorityOrder,
    getRecommendedFormat,
    getContentFilter
  };

  return (
    <LearningStyleContext.Provider value={value}>
      {children}
    </LearningStyleContext.Provider>
  );
};