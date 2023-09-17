import { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  ThemeProvider,
  createTheme,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import QRCode from 'qrcode.react';
import SearchIcon from '@mui/icons-material/Search';


const UrlList = () => {
  
  const [urls, setUrls] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load data from local storage when the component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const uniqueUrls = userData.reduce((accumulator, item) => {
        // Check if an item with the same name already exists in accumulator
        const existingItem = accumulator.find((u) => u.name === item.name);
        if (!existingItem) {
          accumulator.push({
            name: item.name,
            shortUrl: item.shortUrl,
            longUrl: item.longUrl,
          });
        }
        return accumulator;
      }, []);
      setUrls(uniqueUrls);
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#FF5722',
      },
      background: {
        default: '#F5F5F5',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper
        style={{
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="h6" width="100%" textAlign="center">
          Your URLs
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          label="Search URLs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '16px' }}
        />

        <List>
          {urls
            .filter((url) =>
              url.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((url) => (
              <ListItem
                key={url.id}
                style={{
                  backgroundColor: 'white',
                  marginBottom: '8px',
                  borderRadius: '8px',
                }}
              >
                <ListItemText
                  primary={url.name}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        Long URL:{' '}
                        <Link
                          href={url.longUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.longUrl}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Short URL:{' '}
                        <Link
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.shortUrl}
                        </Link>
                      </Typography>
                      <Grid container justifyContent="center" marginTop="1vh">
                        <QRCode value={url.longUrl} />
                      </Grid>
                    </>
                  }
                />
                
              </ListItem>
            ))}
        </List>
      </Paper>
    </ThemeProvider>
  );
};

export default UrlList;
