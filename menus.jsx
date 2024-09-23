import { faUser } from "@fortawesome/free-solid-svg-icons";
import Account from "./src/pages/Profile/Account";
import SocialLinks from "./src/pages/Profile/SocialLinks";
import Notifications from "./src/pages/Profile/Notifications";

// Menus da Navbar principal
export const navMenus = [
    { label: 'Início', path: '/' },
];

// Menus do menu superior direito, onde aparece o nome e o avatar. (ProfileCard)
export const profileMenus = [
    { label: 'Perfil', path: '/profile', icon: faUser },
];

// Menus da página do Perfil /profile
export const accountMenus = [
    { label: 'Conta', component: <Account />, active: false },
    { label: 'Redes Sociais', component: <SocialLinks />, active: false },
    { label: 'Notificações', component: <Notifications />, active: false },
]