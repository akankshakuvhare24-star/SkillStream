export interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  embedUrl: string;
}

export const topicVideos: Record<string, Video[]> = {
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
    },
    {
      id: '4UZrsTqkcW4',
      title: 'React Course 2024 (JavaScript Mastery)',
      channel: 'JavaScript Mastery',
      duration: '3:00:00',
      embedUrl: 'https://www.youtube.com/embed/4UZrsTqkcW4'
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
    },
    {
      id: 'W6NZfCO5SIk',
      title: 'JavaScript Tutorial for Beginners (Programming with Mosh)',
      channel: 'Programming with Mosh',
      duration: '1:10:00',
      embedUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk'
    }
  ],
  
  python: [
    {
      id: 'rfscVS0vtbw',
      title: 'Python Tutorial for Beginners (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '4:40:00',
      embedUrl: 'https://www.youtube.com/embed/rfscVS0vtbw'
    },
    {
      id: 'JJmcLdN5nfA',
      title: 'Python Crash Course (Traversy Media)',
      channel: 'Traversy Media',
      duration: '1:45:00',
      embedUrl: 'https://www.youtube.com/embed/JJmcLdN5nfA'
    }
  ],
  
  node: [
    {
      id: 'Oe421EPjeBE',
      title: 'Node.js / Express Course (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '8:00:00',
      embedUrl: 'https://www.youtube.com/embed/Oe421EPjeBE'
    },
    {
      id: 'zb3Qk8SG5Ms',
      title: 'Node.js Crash Course (Traversy Media)',
      channel: 'Traversy Media',
      duration: '1:30:00',
      embedUrl: 'https://www.youtube.com/embed/zb3Qk8SG5Ms'
    }
  ],
  
  docker: [
    {
      id: 'fqMOX6JJhGo',
      title: 'Docker Tutorial (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '4:00:00',
      embedUrl: 'https://www.youtube.com/embed/fqMOX6JJhGo'
    },
    {
      id: '3c-iBn73dDE',
      title: 'Docker Crash Course (Traversy Media)',
      channel: 'Traversy Media',
      duration: '1:00:00',
      embedUrl: 'https://www.youtube.com/embed/3c-iBn73dDE'
    }
  ],
  
  aws: [
    {
      id: 'SOTamWNgDKc',
      title: 'AWS Certified Cloud Practitioner (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '4:00:00',
      embedUrl: 'https://www.youtube.com/embed/SOTamWNgDKc'
    }
  ],
  
  mongodb: [
    {
      id: 'ofme2o29ngU',
      title: 'MongoDB Tutorial (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '1:30:00',
      embedUrl: 'https://www.youtube.com/embed/ofme2o29ngU'
    }
  ],
  
  typescript: [
    {
      id: 'BwuLxPH8IDs',
      title: 'TypeScript Course (freeCodeCamp)',
      channel: 'freeCodeCamp',
      duration: '5:00:00',
      embedUrl: 'https://www.youtube.com/embed/BwuLxPH8IDs'
    }
  ]
};

export const getVideosForTopic = (topic: string): Video[] => {
  const normalizedTopic = topic.toLowerCase();
  
  if (topicVideos[normalizedTopic]) {
    return topicVideos[normalizedTopic];
  }
  
  for (const [key, videos] of Object.entries(topicVideos)) {
    if (normalizedTopic.includes(key) || key.includes(normalizedTopic)) {
      return videos;
    }
  }
  
  return topicVideos.react;
};