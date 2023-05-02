import React, {FC, FormEvent, useCallback, useState} from 'react';
import classes from './LoginForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomButton from "../button/CustomButton";
import LinkButton from "../button/LinkButton";
import PasswordInputWithToggle from "../input/PasswordInputWithToggle";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const setFocus = useCallback((element: HTMLElement) => element.focus(),
        []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit');
    }

    return (
        <form className={classes.loginForm}
              onSubmit={handleSubmit}>
            <h1>Login to your Artfolio</h1>
            <CustomInput onChange={(e: any) => setEmail(e.target.value)}
                         value={email}
                         type='email'
                         placeholder='Email'
                         ref={setFocus}
            />
            <PasswordInputWithToggle onChange={(e: any) => setPassword(e.target.value)}
                                     value={password}
                                     placeholder='Password'
            />
            <LinkButton onClick={() => {
                console.log('forgot');
            }}>Forgot Password?</LinkButton>
            <CustomButton>Login</CustomButton>
            <p>Don't have an account? <a onClick={() => {
            }}>Sign Up</a></p>
        </form>
    );
};

export default LoginForm;