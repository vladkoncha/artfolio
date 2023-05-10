import React, {useEffect, useRef, useState} from 'react';
import CustomButton, {ButtonClass} from "../button/CustomButton";
import classes from './EditProfileForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomTextArea from "../textarea/CustomTextArea";
import {SubmitHandler, useForm} from "react-hook-form";
import {ERRORS} from "../../errors/errors";
import ErrorMessage from "../error-message/ErrorMessage";


type Inputs = {
    name: string,
    username: string,
    bio: string,
};


const EditProfileForm = () => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>();
    const {ref, ...rest} = register('name', {
        required: false,
        maxLength: {value: 100, message: ERRORS.nameLength},
        pattern: {
            value: /^[\p{L}\s]+$/u, // matches any alphabetical characters and any whitespace characters
            message: ERRORS.nameFormat
        }
    });
    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.editProfileForm}>
            <h1>Edit your profile</h1>

            <div className={classes.container}>
                <h2>Enter your details</h2>

                <div className={classes.inputContainer}>
                    <label>
                        Name
                        <CustomInput
                            {...rest}
                            ref={(e) => {
                                ref(e);
                                nameRef.current = e;
                            }}
                            type='text'
                            placeholder='Name'
                        />
                    </label>
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>

                    <label>
                        Username (*)
                        <CustomInput
                            {...register('username',
                                {
                                    required: ERRORS.fieldRequired,
                                    maxLength: {value: 32, message: ERRORS.usernameLength},
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+$/,
                                        message: ERRORS.usernameFormat
                                    }
                                })}
                            type='text'
                            placeholder='Username'
                        />
                    </label>
                    <ErrorMessage>{errors.username?.message}</ErrorMessage>

                </div>
            </div>

            <div className={classes.container}>
                <h2>Add a short description of you and your works</h2>
                <div className={classes.inputContainer}>
                    <label>
                        Bio
                        <CustomTextArea
                            {...register('bio',
                                {
                                    required: false,
                                    maxLength: 300,
                                })}
                            placeholder='Enter a short Bio'
                            maxLength={300}
                        />
                        <ErrorMessage>{errors.bio?.message}</ErrorMessage>
                    </label>
                </div>
            </div>

            {/*<label>*/}
            {/*    Links:*/}
            {/*    <ul>*/}
            {/*        {links.map((link, index) => (*/}
            {/*            <li key={index}>*/}
            {/*                {link}*/}
            {/*                <button type="button" onClick={() => handleLinkRemove(index)}>*/}
            {/*                    Remove*/}
            {/*                </button>*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*    /!*<input type="text" onChange={(event) => handleLinkAdd(event.target.value)}/>*!/*/}
            {/*    /!*<button type="button" onClick={() => handleLinkAdd()}>*!/*/}
            {/*    /!*    Add*!/*/}
            {/*    /!*</button>*!/*/}
            {/*</label>*/}
            {/*<label>*/}
            {/*    Banner Image:*/}
            {/*    <input type="file" onChange={handleBannerImageChange}/>*/}
            {/*</label>*/}
            {/*<label>*/}
            {/*    Profile Picture:*/}
            {/*    <input type="file" onChange={handlePfpImageChange}/>*/}
            {/*</label>*/}
            <CustomButton
                type='submit'
                buttonClass={ButtonClass.MAIN}
            >
                Save Changes
            </CustomButton>
        </form>
    );
};

export default EditProfileForm;
