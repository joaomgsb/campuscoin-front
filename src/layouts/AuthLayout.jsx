import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Actions/AnimatedCarrousel'
import { useLocation } from 'react-router-dom';

export default function AuthLayout({ children, title }) {
    const location = useLocation();


    
    return (
        <div className="w-full min-h-screen bg-blue-50 relative">

            <Navbar />

            {location.pathname === '/' && <Carousel />}

            <div className="grid grid-cols-12">

                <div className="xl:col-span-2"></div>

                <div className="col-span-12 lg:col-span-10 xl:col-span-8 bg-white min-h-screen p-4 flex flex-col space-y-4">
                    {title && (
                        <div className="flex flex-col space-y-2">
                            <p className="text-xl text-gray-500">
                                {title}
                            </p>
                            <hr />
                        </div>
                    )}

                    {children}
                </div>

                <div className="xl:col-span-2"></div>

            </div>

            <Footer />

        </div>
    );
};