import React from 'react';

export default function LoadingPage() {
    return (
        <div className='w-full h-screen bg-blue-50 flex flex-col items-center justify-center'>
            <p className='text-3xl font-semibold text-slate-700 animate-bounce'>
                Aguarde...
            </p>
        </div>
    );
};