import React, { useContext, useState } from 'react';
import Input from '../components/Input';
import Card from '../components/Card';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Button from '../components/Button';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage('');

        try {
            // Trocar de localhost para IP Publico
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setLoading(false);
                login(data.token, data.user);
                navigate('/');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Tente novamente mais tarde.');
                setLoading(false);
            }
        } catch (error) {
            setMessage('Tente novamente mais tarde.');
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-900">
            <Card title={"Acesse a plataforma"}>

                {message &&
                    <p className='flex px-4 py-2 text-sm bg-red-200 text-red-900 rounded-md'>
                        {message}
                    </p>}

                <form onSubmit={handleLogin} className='flex flex-col space-y-2'>
                    <label htmlFor="email">Email</label>
                    <Input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Senha</label>
                    <Input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Button
                        type='submit'
                        disabled={loading}
                        className={`$loading ?? 'bg-gray-600 text-gray-900`}>
                        {loading ? 'Aguarde...' : 'Acessar'}
                    </Button>

                    <hr />

                    <span className='flex flex-row space-x-1 justify-center pt-4'>
                        <p className='text-gray-600'>Criar uma</p>
                        <Link to='/register' className='text-indigo-500 font-semibold'>nova conta</Link>
                        <p>!</p>
                    </span>

                </form>
            </Card>
        </div>
    );
};
