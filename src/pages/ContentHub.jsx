import React, { useContext, useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import Heading from '../components/Heading';
import { AuthContext } from '../AuthContext';
import Button from '../components/Button';
import { getCurrentDateTime } from '../utils/helpers';
import UserComment from '../components/UserComment';
import Loading from './Loading';
import NavButton from '../components/NavButton';
import Notification from '../components/Notification';

export default function ContentHubPage() {
    const [allVideos, setAllVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [activeComments, setActiveComments] = useState([]);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { userData } = useContext(AuthContext);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    //! Inicia carregamento primário
    useEffect(() => {
        fetchAllVideos();
    }, []);

    //! Carrega todos os videos
    const fetchAllVideos = async () => {
        try {
            const response = await fetch(`${baseUrl}/common/video/all`);

            if (response.ok) {
                const data = await response.json();
                setAllVideos(data);
                setLoading(false);
            } else {
                setMessage({
                    type: 'error',
                    message: `Erro ao carregar os videos`
                });
                setLoading(false);
            }
        } catch (error) {
            setMessage({
                type: 'error',
                message: `Erro ${error}`
            });
            setLoading(false);
        }
    };

    //! Carrega comentário de um video específico
    const fetchVideoComments = async (videoid) => {
        try {
            const response = await fetch(`${baseUrl}/common/video/comments/${videoid}`);

            if (response.ok) {
                const data = await response.json();
                setActiveComments(data);
            } else {
                setActiveComments([]);
            }
        } catch (error) {
            console.error('Erro:', error);
            setActiveComments([]);
        }
    };

    //! Faz o comentário
    const handleComment = async () => {
        const userId = userData.id;
        const userName = userData.name;
        const dateTime = getCurrentDateTime();
        const videoId = activeVideo.id;
        const likes = 0;
        const body = JSON.stringify({
            userId,
            userName,
            dateTime,
            videoId,
            comment,
            likes,
        });

        setComment('');

        try {
            const response = await fetch(`${baseUrl}/common/video/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
            });

            if (response.ok) {
                setMessage({ type: 'success', message: 'Comentário adicionado com sucesso!' });
                fetchVideoComments(videoId);
            } else {
                setMessage({ type: 'error', message: response.status });
            }
        } catch (error) {
            setMessage({ type: 'error', message: `Erro: ${error}` });
        }
    };

    const handleActiveVideo = (videoId) => {
        const video = allVideos.find((v) => v.id === videoId);
        setActiveVideo(video);
        fetchVideoComments(videoId);
        setLoading(false);
    };

    return (
        <AuthLayout>

            {
                message &&
                <Notification notificationData={{
                    type: message.type,
                    message: message.message,
                }}
                    onEnd={() => {
                        setMessage('');
                    }}
                />
            }

            {isLoading ? (
                <Loading />
            ) : (
                <div className="h-full grid grid-cols-8">
                    <nav className="col-span-2 duration-500 rounded-lg flex flex-col space-y-2 p-2 border-r-[1px] border-blue-100">
                        {allVideos.map((video) => (
                            <NavButton
                                key={video.id}
                                buttonData={{
                                    label: video.name
                                }}
                                onClick={() => handleActiveVideo(video.id)}
                            />
                        ))}
                    </nav>

                    <div className="col-span-6 p-4 flex flex-col space-y-4">
                        {activeVideo && (
                            <>

                                <Heading>{activeVideo.name}</Heading>

                                <iframe
                                    width="100%"
                                    height="400"
                                    src={activeVideo.url}
                                    title={activeVideo.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>

                                <Heading>Comentários</Heading>

                                {activeComments.length > 0 ? (
                                    activeComments.map((comment, index) => (
                                        <UserComment key={index} commentData={comment} />
                                    ))
                                ) : (
                                    <p className='text-gray-400'>Este video ainda não possúi comentários.</p>
                                )}

                                <div>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Digite seu comentário"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <Button onClick={() => handleComment(activeVideo.id)}>Comentar</Button>
                                </div>

                            </>
                        )}
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
