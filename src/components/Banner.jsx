import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { FirstLetterUppercase } from '../utils/helpers';

export default function Banner() {
    const { userData } = useContext(AuthContext);

    return (
        <div
            className="w-full h-24 flex bg-gradient-to-r from-[#02213C] to-[#0E3D67]">

            {
                <div className="w-full flex flex-row p-4 justify-between items-center">
                    <span className="text-white">
                        <p>Jornada de</p>
                        <p id="user-name" className="text-4xl font-bold">
                            {userData ? FirstLetterUppercase(userData.name) : 'Erro'}
                        </p>
                    </span>

                    <div className="border-[1px] border-white rounded-md px-4 py-2">
                        <p className="text-white text-sm font-bold">Level {userData.level}</p>
                    </div>
                </div>
            }

        </div>
    );
};