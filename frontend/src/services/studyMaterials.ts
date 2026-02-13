export interface LearningResource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'course' | 'book' | 'tutorial' | 'documentation' | 'video' | 'practice';
  platform: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  free: boolean;
  duration?: string;
  rating?: number;
  skills: string[];
}

export const learningResources: LearningResource[] = [
  // REACT RESOURCES
  {
    id: 'react-1',
    title: 'React Official Documentation',
    description: 'The official React docs with interactive examples',
    url: 'https://react.dev/learn',
    type: 'documentation',
    platform: 'React.dev',
    difficulty: 'beginner',
    free: true,
    skills: ['react', 'javascript', 'frontend']
  },
  {
    id: 'react-2',
    title: 'Full Stack Open',
    description: 'Deep dive into modern web development with React, Redux, Node.js, and GraphQL',
    url: 'https://fullstackopen.com/en/',
    type: 'course',
    platform: 'University of Helsinki',
    difficulty: 'intermediate',
    free: true,
    duration: '12 weeks',
    skills: ['react', 'node', 'graphql', 'redux']
  },
  {
    id: 'react-3',
    title: 'Epic React',
    description: 'The most comprehensive React course by Kent C. Dodds',
    url: 'https://epicreact.dev',
    type: 'course',
    platform: 'Epic React',
    difficulty: 'intermediate',
    free: false,
    duration: '20+ hours',
    rating: 4.9,
    skills: ['react', 'hooks', 'patterns']
  },
  {
    id: 'react-4',
    title: 'React - The Complete Guide',
    description: 'Most popular React course on Udemy',
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    type: 'course',
    platform: 'Udemy',
    difficulty: 'beginner',
    free: false,
    duration: '40+ hours',
    rating: 4.8,
    skills: ['react', 'redux', 'next']
  },
  {
    id: 'react-5',
    title: 'Road to React',
    description: 'The modern React book',
    url: 'https://www.roadtoreact.com',
    type: 'book',
    platform: 'Robin Wieruch',
    difficulty: 'beginner',
    free: false,
    skills: ['react', 'hooks']
  },

  // JAVASCRIPT RESOURCES
  {
    id: 'js-1',
    title: 'JavaScript.info',
    description: 'Modern JavaScript tutorial from basics to advanced',
    url: 'https://javascript.info',
    type: 'tutorial',
    platform: 'javascript.info',
    difficulty: 'beginner',
    free: true,
    skills: ['javascript']
  },
  {
    id: 'js-2',
    title: 'You Don\'t Know JS Yet',
    description: 'Book series deep-dive into JavaScript',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    type: 'book',
    platform: 'GitHub',
    difficulty: 'intermediate',
    free: true,
    skills: ['javascript']
  },
  {
    id: 'js-3',
    title: 'Eloquent JavaScript',
    description: 'Classic JavaScript book available free online',
    url: 'https://eloquentjavascript.net',
    type: 'book',
    platform: 'Marijn Haverbeke',
    difficulty: 'beginner',
    free: true,
    skills: ['javascript']
  },

  // PYTHON RESOURCES
  {
    id: 'py-1',
    title: 'Python Official Tutorial',
    description: 'Official Python documentation tutorial',
    url: 'https://docs.python.org/3/tutorial/',
    type: 'documentation',
    platform: 'Python.org',
    difficulty: 'beginner',
    free: true,
    skills: ['python']
  },
  {
    id: 'py-2',
    title: 'Automate the Boring Stuff with Python',
    description: 'Practical programming for beginners',
    url: 'https://automatetheboringstuff.com',
    type: 'book',
    platform: 'Al Sweigart',
    difficulty: 'beginner',
    free: true,
    skills: ['python']
  },
  {
    id: 'py-3',
    title: 'Python Crash Course',
    description: 'Best-selling Python book',
    url: 'https://nostarch.com/pythoncrashcourse2e',
    type: 'book',
    platform: 'No Starch Press',
    difficulty: 'beginner',
    free: false,
    rating: 4.7,
    skills: ['python']
  },

  // TYPESCRIPT RESOURCES
  {
    id: 'ts-1',
    title: 'TypeScript Handbook',
    description: 'Official TypeScript documentation',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    type: 'documentation',
    platform: 'TypeScript',
    difficulty: 'beginner',
    free: true,
    skills: ['typescript']
  },
  {
    id: 'ts-2',
    title: 'TypeScript Deep Dive',
    description: 'Comprehensive TypeScript guide',
    url: 'https://basarat.gitbook.io/typescript/',
    type: 'book',
    platform: 'GitBook',
    difficulty: 'intermediate',
    free: true,
    skills: ['typescript']
  },

  // NODE.JS RESOURCES
  {
    id: 'node-1',
    title: 'Node.js Documentation',
    description: 'Official Node.js docs',
    url: 'https://nodejs.org/en/docs/guides/',
    type: 'documentation',
    platform: 'Node.js',
    difficulty: 'beginner',
    free: true,
    skills: ['node']
  },
  {
    id: 'node-2',
    title: 'The Odin Project - Node.js',
    description: 'Full-stack JavaScript course with Node.js',
    url: 'https://www.theodinproject.com/paths/full-stack-javascript',
    type: 'course',
    platform: 'The Odin Project',
    difficulty: 'intermediate',
    free: true,
    skills: ['node', 'express', 'mongodb']
  },

  // DATABASE RESOURCES
  {
    id: 'db-1',
    title: 'PostgreSQL Tutorial',
    description: 'Comprehensive PostgreSQL tutorial',
    url: 'https://www.postgresqltutorial.com',
    type: 'tutorial',
    platform: 'PostgreSQL Tutorial',
    difficulty: 'beginner',
    free: true,
    skills: ['postgresql', 'sql']
  },
  {
    id: 'db-2',
    title: 'MongoDB University',
    description: 'Free MongoDB courses',
    url: 'https://university.mongodb.com',
    type: 'course',
    platform: 'MongoDB',
    difficulty: 'beginner',
    free: true,
    skills: ['mongodb']
  },

  // DEVOPS RESOURCES
  {
    id: 'devops-1',
    title: 'Docker Documentation',
    description: 'Official Docker docs with tutorials',
    url: 'https://docs.docker.com/get-started/',
    type: 'documentation',
    platform: 'Docker',
    difficulty: 'beginner',
    free: true,
    skills: ['docker']
  },
  {
    id: 'devops-2',
    title: 'Kubernetes Basics',
    description: 'Official Kubernetes tutorial',
    url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
    type: 'tutorial',
    platform: 'Kubernetes',
    difficulty: 'intermediate',
    free: true,
    skills: ['kubernetes']
  },

  // AWS RESOURCES
  {
    id: 'aws-1',
    title: 'AWS Skill Builder',
    description: 'Free digital training from AWS',
    url: 'https://explore.skillbuilder.aws/learn',
    type: 'course',
    platform: 'AWS',
    difficulty: 'beginner',
    free: true,
    skills: ['aws']
  },
  {
    id: 'aws-2',
    title: 'AWS Certified Cloud Practitioner',
    description: 'Official AWS certification course',
    url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    type: 'course',
    platform: 'AWS',
    difficulty: 'beginner',
    free: false,
    skills: ['aws']
  },

  // PRACTICE PLATFORMS
  {
    id: 'practice-1',
    title: 'LeetCode',
    description: 'Practice coding problems for interviews',
    url: 'https://leetcode.com',
    type: 'practice',
    platform: 'LeetCode',
    difficulty: 'intermediate',
    free: true,
    skills: ['algorithms', 'data-structures']
  },
  {
    id: 'practice-2',
    title: 'HackerRank',
    description: 'Practice coding challenges',
    url: 'https://www.hackerrank.com',
    type: 'practice',
    platform: 'HackerRank',
    difficulty: 'beginner',
    free: true,
    skills: ['algorithms', 'problem-solving']
  },
  {
    id: 'practice-3',
    title: 'freeCodeCamp',
    description: 'Learn to code for free',
    url: 'https://www.freecodecamp.org',
    type: 'course',
    platform: 'freeCodeCamp',
    difficulty: 'beginner',
    free: true,
    skills: ['html', 'css', 'javascript']
  }
];

// Get resources for specific skills
export const getResourcesForSkills = (skills: string[]): LearningResource[] => {
  const matches = learningResources.filter(resource => 
    resource.skills.some(skill => 
      skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    )
  );
  
  // Remove duplicates and sort by rating (if available)
  const unique = matches.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
  
  return unique.slice(0, 5);
};

// Format resources for display in learning path
export const formatResourcesForPath = (resources: LearningResource[]): string => {
  if (resources.length === 0) return '';
  
  let formatted = '\n\n📚 **Recommended Resources:**\n';
  
  resources.forEach((res, index) => {
    const freeBadge = res.free ? '✅ Free' : '💰 Paid';
    formatted += `\n${index + 1}. **${res.title}** (${res.platform})`;
    formatted += `\n   ${res.description}`;
    formatted += `\n   ${freeBadge} | ${res.difficulty} | ${res.type}`;
    if (res.rating) formatted += ` | ⭐ ${res.rating}/5`;
    formatted += `\n   🔗 ${res.url}`;
  });
  
  return formatted;
};