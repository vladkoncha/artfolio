import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import classes from './LoginForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomButton, {ButtonClass} from "../button/CustomButton";
import PasswordInputWithToggle from "../input/PasswordInputWithToggle";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useForm, SubmitHandler} from "react-hook-form";
import {ERRORS} from "../../errors/errors";
import ErrorMessage from "../error-message/ErrorMessage";


type Inputs = {
    email: string,
    password: string,
};

const LoginForm: FC = () => {
    const {store} = useContext(Context);
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [registration, setRegistration] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const emailRef = useRef<HTMLInputElement | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>();
    const {ref, ...rest} = register('email', {
        required: ERRORS.fieldRequired,
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: ERRORS.emailFormat
        }
    });

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async ({email, password}: Inputs) => {
        console.log(email, password);
        setErrorMessage('');
        setLoginLoading(true);
        try {
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
                    emailRef.current?.focus();
                }
            } else {
                setErrorMessage(ERRORS.unknown);
                console.log(e.response?.data);
            }
        } finally {
            setLoginLoading(false);
        }
        console.log('submit');
    };

    return (
        <form className={classes.loginForm}
              onSubmit={handleSubmit(onSubmit)}>
            {registration
                ? <h1>Welcome to Artfolio!</h1>
                : <h1>Login to your Artfolio</h1>}

            <CustomInput
                {...rest}
                ref={(e) => {
                    ref(e);
                    emailRef.current = e;
                }}
                name='email'
                type='email'
                placeholder='Email'
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>

            <PasswordInputWithToggle
                {...register('password',
                    {
                        required: ERRORS.fieldRequired,
                        minLength: {value: 3, message: ERRORS.passwordLength},
                        maxLength: {value: 32, message: ERRORS.passwordLength}
                    })}
                placeholder='Password'
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>

            {!registration && <CustomButton
                buttonClass={ButtonClass.LINK}
                style={{marginRight: '50px'}}
                onClick={() => {
                    console.log('forgot');
                }}>Forgot Password?</CustomButton>}

            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

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