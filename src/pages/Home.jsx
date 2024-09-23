import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import ContentCard from '../components/ContentCard';
import { FirstLetterUppercase } from '../utils/helpers';

export default function HomePage() {
    const { userData } = useContext(AuthContext);

    const cardOptions = [
        { title: 'Content Hub', path: 'content-hub', description: 'Videos com conteudos educativos sobre finanças.', image: 'card1.png' },
        { title: 'Calculadora', path: '/', description: 'Uma calculadora que tambem calcula impostos.', image: 'card2.png' },
        { title: 'Newsletter', path: '/', description: 'Noticias sobre o mundo do investimento e afim.', image: 'card3.png' },
        { title: 'Bolsa de valores', path: 'https://br.tradingview.com/markets/stocks-brazil/#hotlist-stocks-widget', description: 'Acesse as cotações das ações brasileiras.', image: 'card4.png' },
        { title: 'Minhas jornadas', path: '/journey-hub', description: 'Confira os detalhes sobre a suas Jornadas.', image: 'card5.png ' },
    ];

    return (
        <AuthLayout title={`Olá, ${FirstLetterUppercase(userData.name)}`}>
            <span className='flex flex-col space-y-4 items-center justify-center text-gray-600'>
                <p className='text-xl font-semibold'>Bem-vindo(a) ao </p>
                <p className='font-bold text-5xl'>CampusCoin</p>
                <br />
                <p className='text-md text-center'>
                    O Campus Coin é uma plataforma criada especialmente para ajudar universitários a gerenciar suas finanças de maneira eficiente e inteligente.
                    <br />
                    Sabemos que a vida acadêmica pode ser desafiadora, e queremos facilitar sua jornada financeira com ferramentas práticas e informações valiosas.
                </p>

            </span>

            <hr />

            <div className="flex flex-row gap-6 flex-wrap w-full rounded-lg">
                {
                    cardOptions && cardOptions.map((menu, index) => (
                        <ContentCard key={index} menu={menu} />
                    ))
                }
            </div>
        </AuthLayout>
    );
};