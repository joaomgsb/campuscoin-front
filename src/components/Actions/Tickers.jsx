import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Tickers({ symbol }) {
    const widgetRef = useRef(null);

    useEffect(() => {
        const loadWidget = () => {
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "symbol": symbol,
                "width": 350,
                "isTransparent": true,
                "colorTheme": "light",
                "locale": "pt"
            });

            if (widgetRef.current) {
                widgetRef.current.appendChild(script);
            }
        };

        const timer = setTimeout(loadWidget, 0);

        return () => {
            clearTimeout(timer);
            if (widgetRef.current) {
                widgetRef.current.innerHTML = ''; // Clean up script on unmount
            }
        };
    }, []);

    return (
        <div ref={widgetRef}></div>
    );
};