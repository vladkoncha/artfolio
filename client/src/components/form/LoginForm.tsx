import React, {FC, FormEvent, useContext, useEffect, useRef, useState} from 'react';
import classes from './LoginForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomButton from "../button/CustomButton";
import LinkButton from "../button/LinkButton";
import PasswordInputWithToggle from "../input/PasswordInputWithToggle";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ERRORS = {
    credits: "Invalid email or password.",
    unknown: "Unknown error.",
    shortPassword: "Enter password (3 to 32 characters)."
}

const LoginForm: FC = () => {
    const {store} = useContext(Context);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginLoading, setLoginLoading] = useState(false);
    const [registration, setRegistration] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setErrorMessage('');
    }, [registration, email, password]);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginLoading(true);
        try {
            if (password.length < 3) {
                setErrorMessage(ERRORS.shortPassword);
                return;
            }

            if (registration) {
                await store.registration(email, password);
            } else {
                await store.login(email, password);
            }
        } catch (e: any) {
            if (e.response?.data?.status === 400) {
                if (registration) {
                    setErrorMessage(e.response?.data?.message);
                } else {
                    setErrorMessage(ERRORS.credits);
                }
                emailRef.current?.focus();
            } else {
                setErrorMessage(ERRORS.unknown);
                console.log(e.response?.data);
            }
        } finally {
            setLoginLoading(false);
        }
        console.log('submit');
    }

    return (
        <form className={classes.loginForm}
              onSubmit={handleSubmit}>
            {registration
                ? <h1>Welcome to Artfolio!</h1>
                : <h1>Login to your Artfolio</h1>}

            <CustomInput
                onChange={(e: any) => {
                    setEmail(e.target.value);
                }}
                value={email}
                type='email'
                placeholder='Email'
                ref={emailRef}
            />
            <PasswordInputWithToggle
                onChange={(e: any) => {
                    setPassword(e.target.value);
                }}
                value={password}
                placeholder='Password'
            />
            {!registration && <LinkButton
                type='button'
                style={{marginRight: '50px'}}
                onClick={() => {
                    console.log('forgot');
                }}>Forgot Password?</LinkButton>}

            {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
            {registration
                ? <CustomButton disabled={loginLoading}>Register</CustomButton>
                : <CustomButton disabled={loginLoading}>Login</CustomButton>}
            {!registration
                ? <p className={classes.signUp}>Don't have an account? <LinkButton
                    style={{color: 'blue'}}
                    type='button'
                    onClick={() => {
                        setRegistration(true);
                    }}>Sign Up</LinkButton></p>
                : <p className={classes.signUp}>Already have an account? <LinkButton
                    style={{color: 'blue'}}
                    type='button'
                    onClick={() => {
                        setRegistration(false);
                    }}>Sign In</LinkButton></p>
            }
        </form>
    );
};

export default observer(LoginForm);