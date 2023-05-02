import React, {FC, useState} from 'react';
import classes from './LoginForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomButton from "../button/CustomButton";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (

        <div className={classes.loginForm}>
            <h1>Login to your Artfolio</h1>
            <CustomInput onChange={(e: any) => setEmail(e.target.value)}
                         value={email}
                         type='email'
                         placeholder='Email'
            />
            <CustomInput onChange={(e: any) => setPassword(e.target.value)}
                         value={password}
                         type='password'
                         placeholder='Password'
            />
            <CustomButton>Login</CustomButton>
        </div>
    );
};

export default LoginForm;