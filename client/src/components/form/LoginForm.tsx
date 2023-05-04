import React, {ChangeEvent, FC, FormEvent, useContext, useEffect, useRef, useState} from 'react';
import classes from './LoginForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomButton, {ButtonClass} from "../button/CustomButton";
import PasswordInputWithToggle from "../input/PasswordInputWithToggle";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ERRORS = {
    credits: "Invalid email or password.",
    unknown: "Unknown error.",
    shortPassword: "Enter password (3 to 32 characters).",
};

const LoginForm: FC = () => {
    const {store} = useContext(Context);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [registration, setRegistration] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }}
                value={email}
                type='email'
                placeholder='Email'
                ref={emailRef}
            />
            <PasswordInputWithToggle
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                }}
                value={password}
                placeholder='Password'
            />
            {!registration && <CustomButton
                buttonClass={ButtonClass.LINK}
                style={{marginRight: '50px'}}
                onClick={() => {
                    console.log('forgot');
                }}>Forgot Password?</CustomButton>}

            {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}

            <CustomButton
                type='submit'
                buttonClass={ButtonClass.MAIN}
                disabled={loginLoading}>
                {registration ? 'Register' : 'Login'}
            </CustomButton>

            <p className={classes.signUp}>
                {!registration ? "Don't have an account? " : "Already have an account? "}
                <CustomButton
                    buttonClass={ButtonClass.LINK}
                    style={{color: 'blue'}}
                    onClick={() => {
                        setRegistration(!registration);
                    }}> {!registration ? "Sign Up" : "Sign In"}
                </CustomButton>
            </p>
        </form>
    );
};

export default observer(LoginForm);