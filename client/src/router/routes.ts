import EditProfileForm from "../components/edit-profile-form/EditProfileForm";
import LoginForm from "../components/form/LoginForm";

export const privateRoutes = [
    {path: '/profile', component: EditProfileForm},
];

export const publicRoutes = [
    {path: '/login', component: LoginForm},
];