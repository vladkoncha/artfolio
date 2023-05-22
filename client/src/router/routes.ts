import EditProfileForm from "../components/edit-profile-form/EditProfileForm";
import LoginForm from "../components/login-form/LoginForm";
import Profile from "../components/profile/Profile";

export const privateRoutes = [
    {path: '/edit', component: EditProfileForm},
    {path: '/:username', component: Profile},
];

export const publicRoutes = [
    {path: '/login', component: LoginForm},
    {path: '/:username', component: Profile},
];