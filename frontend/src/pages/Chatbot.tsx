import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  CircularProgress,
  Chip,
  Button  
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isSearch?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🔍 Hi! I'm your AI learning assistant with Wikipedia + DuckDuckGo search! Ask me anything about programming, technology, or computer science!\n\nTry asking:\n• 'what is React'\n• 'explain JavaScript closures'\n• 'Python vs JavaScript'\n• 'how does Docker work'",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Wikipedia API Search
  const searchWikipedia = async (query: string): Promise<string> => {
    try {
      const searchResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          srsearch: query,
          format: 'json',
          origin: '*',
          srlimit: 1
        }
      });

      const searchResults = searchResponse.data.query?.search || [];
      
      if (searchResults.length === 0) {
        return "I couldn't find information about that on Wikipedia. Try asking about programming languages, technologies, or computer science concepts.";
      }

      const firstResult = searchResults[0];
      const pageId = firstResult.pageid;

      const summaryResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          pageids: pageId,
          prop: 'extracts',
          exintro: true,
          explaintext: true,
          format: 'json',
          origin: '*'
        }
      });

      const page = summaryResponse.data.query?.pages?.[pageId];
      const extract = page?.extract || '';
      const title = page?.title || firstResult.title;
      
      let response = `📚 **${title}**\n\n`;
      response += extract.substring(0, 600) + (extract.length > 600 ? '...' : '');
      response += `\n\n🔗 Read more: https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;

      return response;
    } catch (error) {
      return "I tried to search Wikipedia but encountered an error. Trying DuckDuckGo instead...";
    }
  };

  // DuckDuckGo Fallback Search
  const searchDuckDuckGo = async (query: string): Promise<string> => {
    try {
      const response = await axios.get('https://api.duckduckgo.com/', {
        params: {
          q: query,
          format: 'json',
          no_html: 1,
          skip_disambig: 1,
          t: 'skillstream'
        }
      });

      const data = response.data;
      
      if (data.AbstractText) {
        let result = `🔍 **${data.Heading || query}**\n\n`;
        result += data.AbstractText;
        
        if (data.AbstractURL) {
          result += `\n\n🔗 ${data.AbstractURL}`;
        }
        
        return result;
      } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        let result = `🔍 **Related to "${query}":**\n\n`;
        data.RelatedTopics.slice(0, 3).forEach((topic: any, index: number) => {
          if (topic.Text) {
            result += `${index + 1}. ${topic.Text}\n`;
          }
        });
        return result;
      } else {
        return `I searched for "${query}" but couldn't find specific information. Try being more specific or ask about programming concepts.`;
      }
    } catch (error) {
      return `I couldn't complete the search right now. Please try again later.`;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const searchingId = messages.length + 2;
      setMessages(prev => [...prev, {
        id: searchingId,
        text: `🔎 Searching for "${currentInput}"...`,
        sender: 'ai',
        timestamp: new Date()
      }]);

      let answer = await searchWikipedia(currentInput);
      let method = 'wikipedia';
      
      if (answer.includes("couldn't find information") || answer.includes("encountered an error")) {
        answer = await searchDuckDuckGo(currentInput);
        method = 'duckduckgo';
      }

      setMessages(prev => {
        const filtered = prev.filter(m => !m.text.includes('🔎 Searching'));
        return [...filtered, {
          id: messages.length + 3,
          text: answer,
          sender: 'ai',
          timestamp: new Date(),
          isSearch: true
        }];
      });

    } catch (error) {
      setMessages(prev => prev.filter(m => !m.text.includes('🔎 Searching')));
      
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: "😕 Sorry, I couldn't find information about that. Try asking about programming languages or technologies.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const sampleQuestions = [
    "what is React",
    "explain JavaScript closures",
    "Python vs JavaScript",
    "how does Docker work"
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, overflow: 'auto', pb: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <SmartToyIcon color="primary" />
            <Typography variant="h5">AI Learning Assistant</Typography>
            <Chip 
              icon={<SearchIcon />} 
              label="Wikipedia + DuckDuckGo" 
              size="small" 
              color="success"
            />
            <Chip 
              label="No API Key Required" 
              size="small" 
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {sampleQuestions.map((q, i) => (
              <Chip
                key={i}
                label={q}
                size="small"
                onClick={() => setInput(q)}
                clickable
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          
          <Box sx={{ mt: 2 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', maxWidth: '80%' }}>
                  {message.sender === 'ai' && (
                    <Avatar sx={{ 
                      bgcolor: message.isSearch ? 'success.main' : 'primary.main', 
                      mr: 1 
                    }}>
                      {message.isSearch ? <SearchIcon /> : <SmartToyIcon />}
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: message.sender === 'user' ? 'primary.main' : 
                              message.isSearch ? 'success.light' : 'grey.100',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        '& a': { color: message.sender === 'user' ? 'white' : 'primary.main' }
                      }}
                    >
                      {message.text}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Paper>
                  {message.sender === 'user' && (
                    <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
                      <PersonIcon />
                    </Avatar>
                  )}
                </Box>
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: 6 }}>
                <CircularProgress size={20} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
        </CardContent>
        
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about programming, technology, or computer science..."
              variant="outlined"
              size="small"
            />
            <IconButton 
              color="primary" 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              sx={{ alignSelf: 'flex-end' }}
            >
              <SendIcon />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            🔍 Powered by Wikipedia + DuckDuckGo - No API key required!
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Chatbot;

