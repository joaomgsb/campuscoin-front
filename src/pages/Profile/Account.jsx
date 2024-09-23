import React, { useContext, useEffect, useRef, useState } from 'react';
import Input from '../../components/Input';
import { AuthContext } from '../../AuthContext';
import Button from '../../components/Button';
import Label from '../../components/Label';
import Heading from '../../components/Heading';

export default function AccountPage() {
    const { userData } = useContext(AuthContext);
    const [isValidPassword, setValidPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
    });
    const formRef = useRef(null);

    useEffect(() => {

        if (formData.newPassword !== null && formData.confirmPassword !== null) {
            if (formData.newPassword !== formData.confirmPassword) {
                setMessage('As senhas não coincidem');
                setValidPassword(false);
            } else {
                setValidPassword(true);
                setMessage(null);
            }
        } else {
            setMessage(null);
            setValidPassword(false);
        }

    }, [formData.password, formData.newPassword, formData.confirmPassword]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleResetForm = () => {
        setFormData({
            password: '',
            newPassword: '',
            confirmPassword: '',
        });

        formRef.current.reset();
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const userId = userData.id;
        const password = formData.password;
        const newPassword = formData.newPassword;

        try {
            const response = await fetch('http://187.74.75.122:3000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    password,
                    newPassword,
                })
            });

            if (response.ok) {
                console.log('Troca de senha realizada com sucesso!');
                handleResetForm();
            } else {
                console.log('Erro ao trocar a senha!');
            }
        } catch (error) {
            console.error(`Erro: ${error}`);
        }
    }

    return (
        <div className='flex flex-col space-y-4'>

            <Heading>
                Minha conta
            </Heading>

            <hr />

            <Label htmlFor="name">Confirme a nova senha</Label>
            <Input id='name' value={userData.name} readOnly={true} />

            <Label htmlFor="email">Confirme a nova senha</Label>
            <Input id='email' type='email' value={userData.email} readOnly={true} />

            <Heading>
                Troca de senha
            </Heading>

            <hr />

            <form
                ref={formRef}
                onSubmit={handleChangePassword}
                className='flex flex-col space-y-4'>

                <Label htmlFor="old-password">Senha atual</Label>
                <Input
                    id='old-password'
                    type="password"
                    name="password"
                    onChange={handleChange}
                />

                <Label htmlFor="new-password">Nova senha</Label>
                <Input
                    id='new-password'
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                />

                <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                <Input
                    id='confirm-password'
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                />

                {
                    formData.newPassword !== formData.confirmPassword &&
                    <p className="bg-red-200 text-red-600 px-2 py-2 rounded-md">
                        {message}
                    </p>
                }

                <Button
                    type="submit"
                    disabled={!isValidPassword || formData.password === '' || formData.newPassword === '' || formData.confirmPassword === ''}>
                    Trocar senha
                </Button>
            </form>

        </div >
    );
};