import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setMessage('As senhas não coincidem');
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            });

            if (response.ok) {
                return navigate('/login');
            } else {
                setMessage('Error ao se registrar');
            }
        } catch (error) {
            setMessage(`Erro: ${error}`);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-slate-900">

            <Card title={"Registre-se"}>
                <form onSubmit={handleRegister} className='flex flex-col space-y-2'>

                    <label htmlFor="name">Nome</label>
                    <Input type='text' onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Senha</label>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="passwordConfirm">Confirme a senha</label>
                    <Input type='password' onChange={(e) => setPasswordConfirm(e.target.value)} />

                    <Button
                        type='submit'
                        disabled={loading}
                        className={loading ?? 'bg-gray-600 text-gray-900'}>
                        {loading ? 'Aguarde...' : 'Registrar'}
                    </Button>
                </form>

                {message && <p className="text-red-500">{message}</p>}
            </Card>

        </div>
    );
};
