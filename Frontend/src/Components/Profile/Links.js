import { useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Link,
  ThemeProvider,
  createTheme,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import QRCode from 'qrcode.react';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { AuthContext } from '../Authentication/Auth';

const UrlList = () => {
  const userData = useContext(AuthContext).data;
  const [urls, setUrls] = useState(
    userData.reduce((unique, item) => {
      const existingItem = unique.find((u) => u.name === item.name);
      if (!existingItem) {
        unique.push({
          name: item.name,
          shortUrl: item.shortUrl,
          longUrl: item.longUrl,
        });
      }
      return unique;
    }, [])
  );

  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleDeleteUrl = (urlId) => {
    setUrls((prevUrls) => prevUrls.filter((url) => url.id !== urlId));
  };

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
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteUrl(url.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Paper>
    </ThemeProvider>
  );
};

export default UrlList;
