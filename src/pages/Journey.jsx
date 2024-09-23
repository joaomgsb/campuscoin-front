import React, { useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Heading from '../components/Heading';
import { useParams } from 'react-router-dom';
import LoadingPage from './Loading';
import { handleFetch } from '../utils/helpers';
import Notification from '../components/Notification'; // Assuming Notification is a component you have for displaying messages
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

export default function JourneyPage() {
    const [message, setMessage] = useState(null);
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [stageData, setStageData] = useState([]);
    const [currentStage, setCurrentStage] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;


    const LoadJourneyStages = async () => {
        try {
            const response = await handleFetch({ endPoint: `journey/stages/${id}`, method: 'GET' });

            if (response.ok) {
                const data = await response.json();
                setStageData(data);

                const completedList = stageData.filter(stage => stage.completed);

                // completedList.sort((a, b)=>)

                setCurrentStage(data[0]);
            } else {
                console.log('Erro ao fazer o fetch');
            }
        } catch (err) {
            console.error(`${err}`);
        }
    };

    const handleNextStage = async () => {
        if (!currentStage) return;

        currentStage.completed = true;

        try {
            const response = await fetch(`${baseUrl}/journey/stages/update/1`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: currentStage.id,
                    completed: currentStage.completed,
                })
            });

            if (response.ok) {
                const nextStageIndex = stageData.findIndex(stage => stage.id === currentStage.id) + 1;

                if (nextStageIndex <= stageData.length) {
                    setCurrentStage(stageData[nextStageIndex]);
                } else {
                    setMessage({ type: 'success', text: 'Todas as etapas foram concluídas!' });
                }
            } else {
                console.log('Erro ao atualizar a etapa');
            }
        } catch (err) {
            console.error(`${err}`);
        }
    };

    useEffect(() => {
        LoadJourneyStages();
    }, []);

    useEffect(() => {
        if (stageData.length != 0) {
            setLoading(false);
        }
    }, [stageData]);

    return (
        isLoading ?
            <LoadingPage />
            :
            <AuthLayout>
                {message && <Notification notificationData={message} />}

                <JourneyBanner currentSate={currentStage} allStages={stageData} />

                <div id="main" className="flex flex-row gap-2 items-center">

                    {
                        stageData && stageData.map((stage, index) => (
                            <div
                                key={stage.id}
                                className={`w-20 h-20 rounded-md flex flex-col items-center justify-center transition-colors ${stage.completed ? 'bg-blue-500' : 'border-[1px] border-blue-500'}`}>
                                <p className={`text-3xl font-bold ${stage.completed ? 'text-white' : 'text-blue-500'}`}> {index + 1} </p>
                            </div>
                        ))
                    }
                </div>

                <hr />

                <div className="col-span-6 p-4 flex flex-col space-y-4">

                    <Heading>
                        {currentStage.title}
                    </Heading>

                    {currentStage.content}

                    <Button
                        onClick={handleNextStage}>
                        {
                            currentStage.id === stageData[stageData.length - 1].id ?
                                'Concluir' : 'Proximo'
                        }
                    </Button>
                </div>

            </AuthLayout>
    );
};


export const JourneyBanner = ({ currentSate, allStages }) => (
    <div className="w-full h-24 flex bg-gradient-to-r from-[#02213C] to-[#0E3D67]">

        <div className="w-full flex flex-row justify-between items-center px-4">

            <div className="flex-1 flex flex-row items-center space-x-4 m-4">
                <FontAwesomeIcon icon={faBitcoin} className='text-white text-7xl' />

                <p className='text-3xl font-bold text-white'>
                    {currentSate.title}
                </p>
            </div>

            <div className="h-full flex-1 flex flex-col items-start justify-center p-4 m-4 space-y-4 text-white">
                <p>1/4</p>
                <progress
                    className="w-full rounded-md bg-blue-500"
                    value={1}
                    max={4}
                />

            </div>

        </div>

    </div>
)