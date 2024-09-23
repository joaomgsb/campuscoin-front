import React, { useEffect, useState } from 'react';

export default function Notification({ notificationData, duration = 5000, onEnd }) {
    const [isAppear, setAppearing] = useState(false);
    const [color, setColor] = useState('bg-blue-100 border-blue-200 text-blue-600');

    useEffect(() => {
        setAppearing(true);
        getColorByStatus(notificationData.type);
        const hiddenMsg = setTimeout(() => {
            setAppearing(false);
            { onEnd && onEnd(); }
        }, duration);
    }, []);

    function getColorByStatus(type) {
        if (type === 'success') {
            setColor('bg-green-100 border-green-200 text-green-600');
        } else if (type === 'error') {
            setColor('bg-red-100 border-red-200 text-red-600');
        } else if (type === 'info') {
            setColor('bg-blue-100 border-blue-200 text-blue-600');
        } else {
            setColor('bg-gray-100 border-gray-200 text-gray-600');
        }
    }

    return (
        <div className={`fixed right-4 p-4 bottom-4 shadow-xl border-[1px] ${color} transform transition-transform duration-1000 ease-in-out ${isAppear ? 'translate-x-0' : 'translate-x-full -right-24'} rounded-md`}>
            {notificationData.message}
        </div>
    );
};
