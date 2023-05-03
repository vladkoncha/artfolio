import React, {FC, FormEvent, useContext, useEffect, useRef, useState} from 'react';
import classes from './LoginForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomButton from "../button/CustomButton";
import LinkButton from "../button/LinkButton";
import PasswordInputWithToggle from "../input/PasswordInputWithToggle";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [invalidCredits, setInvalidCredits] = useState(false);
    const [unknownError, setUnknownError] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [registration, setRegistration] = useState(false);
    const [registrationError, setRegistrationError] = useState('');

    const {store} = useContext(Context);

    useEffect(() => {
        setRegistrationError('');
        setShortPassword(false);
        setInvalidCredits(false);
    }, [registration, email])

    const emailRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoginLoading(true);
        try {
            if (password.length < 3) {
                setShortPassword(true);
                return;
            } else {
                setShortPassword(false);
            }

            if (registration) {
                await store.registration(email, password);
            } else {
                await store.login(email, password);
            }
            setUnknownError(false);
            setInvalidCredits(false);
        } catch (e: any) {
            if (e.response?.data?.status === 400) {
                if (registration) {
                    setRegistrationError(e.response?.data?.message);
                } else {
                    setInvalidCredits(true);
                }
                emailRef.current?.focus();
            } else {
                setUnknownError(true);
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

            <CustomInput onChange={(e: any) => {
                setEmail(e.target.value);
                setInvalidCredits(false);
            }}
                         value={email}
                         type='email'
                         placeholder='Email'
                         ref={emailRef}
            />
            <PasswordInputWithToggle
                onChange={(e: any) => {
                    setPassword(e.target.value);
                    setInvalidCredits(false);
                    setShortPassword(false);
                }}
                value={password}
                placeholder='Password'
            />
            {!registration && <LinkButton
                type='button'
                onClick={() => {
                    console.log('forgot');
                }}>Forgot Password?</LinkButton>}

            {registrationError && <p className={classes.errorMessage}>{registrationError}</p>}
            {shortPassword && <p className={classes.errorMessage}>Enter password.</p>}
            {invalidCredits && <p className={classes.errorMessage}>Invalid email or password.</p>}
            {unknownError && <p className={classes.errorMessage}>Unknown error.</p>}
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