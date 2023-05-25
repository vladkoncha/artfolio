import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";

export const privateRoutes = [
    {path: '/edit', component: EditProfilePage},
    {path: '/:username', component: ProfilePage},
];

export const publicRoutes = [
    {path: '/login', component: LoginPage},
    {path: '/:username', component: ProfilePage},
];