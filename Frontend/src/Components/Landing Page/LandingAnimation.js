import React, { useState, useEffect } from 'react';
import { Typography, Paper } from '@mui/material';

const LandingAnimation = () => {
    const [animationText, setAnimationText] = useState('');

    useEffect(() => {
        const longUrl = 'https://www.this-is-a-really-long-and-annoying-url-that-you-just-want-to-shorten.com';
        const shortUrl = 'https://NarrowURL/short&tracked';

        let currentIndex = 0;
        const interval = setInterval(() => {
            setAnimationText(shortUrl.substring(0, currentIndex));
            currentIndex++;

            if (currentIndex > shortUrl.length) {
                clearInterval(interval);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h5">Long URL Troubles?</Typography>
            <Typography variant="body1">
                Converting: <span>{animationText}</span>
            </Typography>
            <Typography variant="body2">
                Imagine having to deal with this: <br />
                {animationText}
            </Typography>
        </Paper>
    );
};

export default LandingAnimation;
