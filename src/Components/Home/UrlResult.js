import React,{useState} from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCode from 'qrcode.react';


const UrlResult = ({shortlink,message}) => {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shortlink); // Copy the shortlink to the clipboard
        setIsCopied(true); // Set copied state to true
        };

    return(
    <>
    <Grid item xs={12} >
          <Typography sx={{ width: '95%', font: 'roboto' }} variant="h6" textAlign="center" p={2}>
            {shortlink[1]}
          </Typography>
          <Typography variant="h6" sx={{ borderStyle: 'inset' }} textAlign="center" p={2}>
            {shortlink[0]}
            <Button
              variant="outlined"
              sx={{ width: '10%', marginLeft: '5%' }}
              onClick={handleCopyToClipboard}
            >
              {isCopied ? 'Copied!' : <ContentCopyIcon />}
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ width: '100%' }} textAlign="center" p={2}>
            QR Code
          </Typography>
          <Box display="flex" justifyContent="center">
            <QRCode value={shortlink} />
          </Box>
        </Grid>
    </>)
}

export default UrlResult;