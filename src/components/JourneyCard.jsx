import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import PropTypes from 'prop-types';

export default function JourneyCard({ journeyData, active = false, completed = false, onClick, ...props }) {
    const { userData } = useContext(AuthContext);
    const [isDisabled, setDisabled] = useState(false);
    const [label, setLabel] = useState('Desconhecido');
    const [labelColor, setLabelColor] = useState('bg-gray-300 text-gray-600');
    const [buttonLabel, setButtonLabel] = useState('Desconhecido');
    const [buttonColor, setButtonColor] = useState('bg-gray-200 text-gray-600');

    function getCardStatus(journey) {
        if (journey.level > userData.level) {
            setDisabled(true);
            setLabel('Indisponível');
            setLabelColor('bg-gray-300 text-gray-600');
            setButtonLabel('Indisponível');
            setButtonColor('bg-gray-200 text-gray-600');
        } else {
            if (active && !completed) {
                setLabel('Ativa');
                setLabelColor('bg-blue-400 text-white');
                setButtonLabel('Visualizar');
                setButtonColor('border-blue-400 border-[1px] text-blue-700');
            } else if (active && completed) {
                setLabel('Concluída');
                setLabelColor('bg-green-500 text-white');
                setButtonLabel('Visualizar');
                setButtonColor('bg-green-100 text-green-700');
            } else {
                setLabel('Disponível');
                setLabelColor('bg-blue-800 text-white');
                setButtonLabel('Começar');
                setButtonColor('bg-blue-400 text-white');
            }
        }
    };

    useEffect(() => {
        getCardStatus(journeyData);
    }, [journeyData, active, completed, userData.level]);

    return (
        <div {...props} className="w-56 h-80 flex flex-col bg-white rounded-md">
            <p className={`w-full h-10 ${labelColor} flex items-center justify-center text-center rounded-t-md text-sm`}>
                {label}
            </p>
            <div className="flex items-center justify-center flex-col space-y-4 p-4 flex-1 w-full">
                <div className="flex items-center justify-center flex-1 bg-white">
                    <FontAwesomeIcon icon={faBullseye} className='text-7xl text-gray-400' />
                </div>
                <p className='text-gray-600 font-bold text-sm'>
                    {journeyData.name}
                </p>
                <button
                    disabled={isDisabled}
                    className={`w-full py-2 rounded-md text-sm ${buttonColor}`}
                    onClick={onClick}
                >
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}

JourneyCard.propTypes = {
    journeyData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
    }).isRequired,
    active: PropTypes.bool,
    completed: PropTypes.bool,
};
