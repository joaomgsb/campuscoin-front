import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Tickers from './Tickers';

const carouselData = [
    { id: 1, content: <Tickers symbol="BMFBOVESPA:PETR4" /> },
    { id: 2, content: <Tickers symbol="BMFBOVESPA:ITUB4" /> },
    { id: 3, content: <Tickers symbol="BMFBOVESPA:VALE3" /> },
    { id: 4, content: <Tickers symbol="BMFBOVESPA:WEGE3" /> },
    { id: 5, content: <Tickers symbol="BMFBOVESPA:ABEV3" /> },
    { id: 6, content: <Tickers symbol="BMFBOVESPA:BBAS3" /> },
    { id: 7, content: <Tickers symbol="BMFBOVESPA:BPAC11" /> },
    { id: 8, content: <Tickers symbol="BMFBOVESPA:BBDC3" /> },
    { id: 9, content: <Tickers symbol="BMFBOVESPA:ITSA4" /> },
    { id: 10, content: <Tickers symbol="BMFBOVESPA:SANB11" /> },
    { id: 11, content: <Tickers symbol="BMFBOVESPA:ELET3" /> },
    { id: 12, content: <Tickers symbol="BMFBOVESPA:VIVT3" /> },
    { id: 13, content: <Tickers symbol="BMFBOVESPA:JBSS3" /> }
];

const Carousel = () => {
    const controls = useAnimation();
    const carouselRef = useRef(null);

    useEffect(() => {
        const width = carouselRef.current.scrollWidth / 2;
        controls.start({
            x: -width,
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 100,
                    ease: 'linear'
                }
            }
        });
    }, [controls]);

    return (
        <div className='relative w-full h-24 bg-white overflow-hidden border-b-[1px]'>
            <motion.div
                ref={carouselRef}
                className='flex w-[100%] h-[100%]'
                animate={controls}
            >
                {carouselData.map((item) => (
                    <div key={item.id} className="w-[20%] h-full" style={{ flex: '0 0 20%' }}>
                        {item.content}
                    </div>
                ))}
                {carouselData.map((item) => (
                    <div key={item.id + '-clone'} className="w-[20%] h-full" style={{ flex: '0 0 20%' }}>
                        {item.content}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Carousel;
