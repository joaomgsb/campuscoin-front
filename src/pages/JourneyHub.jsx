import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Notification from '../components/Notification';
import { handleFetch } from '../utils/helpers';
import Heading from '../components/Heading';
import JourneyCard from '../components/JourneyCard';
import Banner from '../components/Banner';
import { useNavigate } from 'react-router-dom';

export default function JourneyHubPage() {
    const [message, setMessage] = useState(null);
    const [journeys, setJourneys] = useState([]);
    const [userJourneys, setUserJourneys] = useState([]);
    const [listOne, setListOne] = useState([]);
    const [listTwo, setListTwo] = useState([]);
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();

    // Inicia a pagina
    useEffect(() => {
        fetchAllJourneys();
        fetchUserJourneys();
        fetchUserData();
    }, []);

    useEffect(() => {
        handleFixList();
    }, [journeys, userJourneys]);

    const fetchUserData = async () => {
        const response = await handleFetch({ endPoint: `common/user/${userData.id}`, method: 'GET' });

        if (response.ok) {
            const data = response.json();
            console.log(`DEBUG: retorno do usuário id ${userData.id} ${JSON.stringify(data)}`);
        } else {
            console.log('DEBUG: Error ao tentar acessar usuário');
        }
    }

    const fetchAllJourneys = async () => {
        const response = await handleFetch({ endPoint: 'journey/all', method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            setJourneys(Array.isArray(data) ? data : []);
        } else {
            setJourneys([]);
        }
    };

    const fetchUserJourneys = async () => {
        const userId = userData.id;
        const response = await handleFetch({ endPoint: `journey/user/${userId}`, method: 'GET' });

        if (response.ok) {
            const data = await response.json();
            setUserJourneys(Array.isArray(data) ? data : []);
        } else {
            setUserJourneys([]);
        }
    };

    const handleFixList = () => {
        const listOneTemp = [];
        const listTwoTemp = [];

        if (Array.isArray(journeys) && Array.isArray(userJourneys)) {
            journeys.forEach(aj => {
                if (userJourneys.some(uj => aj.id === uj.journey_id)) {
                    listOneTemp.push(aj);
                } else {
                    listTwoTemp.push(aj);
                }
            });
        }

        setListOne(listOneTemp);
        setListTwo(listTwoTemp);
    };

    const isJourneyCompleted = (id) => userJourneys.some(uj => uj.journey_id === id && uj.completed);

    const setJourneyToUser = async (journey) => {
        const body = {
            journeyId: journey.id,
            completed: 0,
            stages: journey.stages,
            actualStage: 0,
            userId: userData.id
        };

        try {
            const response = await handleFetch({ endPoint: 'journey/user/add', method: 'POST', body: body });

            if (response.ok) {
                // Fetch the updated journeys and user journeys after adding a new journey
                await fetchAllJourneys();
                await fetchUserJourneys();
                setMessage({
                    type: 'success',
                    message: `Você iniciou a jornada ${journey.name}`
                });
            } else {
                console.log(`Erro: ${response.status}`);
            }
        } catch (err) {
            setMessage({
                type: 'error',
                message: 'Erro ao adicionar a jornada.'
            });
        }
    }

    return (
        <AuthLayout>
            {message && <Notification notificationData={message} />}

            <Banner />

            <div className="col-span-6 p-4 flex flex-col space-y-4">

                <Heading>Minhas jornadas</Heading>

                <div className="bg-gray-100 rounded-md flex flex-row gap-4 p-4 flex-wrap items-center justify-center md:justify-start">
                    {
                        listOne.length > 0 ?
                            listOne.map((j) =>
                                <JourneyCard
                                    key={j.id}
                                    journeyData={j}
                                    active={true}
                                    completed={isJourneyCompleted(j.id)}
                                    onClick={() => navigate(`/journey/${j.id}`)}
                                />
                            ) :
                            <p className='text-gray-400'>
                                Nenhuma jornada disponível.
                            </p>
                    }
                </div>

                <hr />

                <Heading>Todas jornadas</Heading>

                <div className="bg-gray-100 rounded-md flex flex-row gap-4 p-4 flex-wrap items-center justify-center md:justify-start">
                    {
                        listTwo.length > 0 ?
                            listTwo.map((j) =>
                                <JourneyCard
                                    key={j.id}
                                    journeyData={j}
                                    onClick={() => setJourneyToUser(j)}
                                />
                            ) :
                            <p className='text-gray-400'>Nenhuma jornada disponível.</p>
                    }
                </div>
            </div>
        </AuthLayout>
    );
}
