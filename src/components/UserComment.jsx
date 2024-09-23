import React from 'react';

export default function UserComment({ commentData }) {
    return (
        <div className="flex flex-col space-y-2 bg-gray-50 rounded-md p-4 border-[1px] border-gray-200">
            <div className="flex flex-row justify-between items-center">
                <p className='text-lg font-semibold text-gray-600'>
                    {commentData.username}
                </p>

                <p className='text-gray-400'>
                    {commentData.datetime}
                </p>
            </div>

            <p className='text-gray-500'>
                {commentData.comment}
            </p>
        </div>
    );
};