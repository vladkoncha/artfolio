import React, {Fragment, useEffect} from 'react';
import CustomButton, {ButtonClass} from "../button/CustomButton";
import classes from './EditProfileForm.module.scss';
import CustomInput from "../input/CustomInput";
import CustomTextArea from "../textarea/CustomTextArea";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {ERRORS, getFormatError, getLengthError} from "../../errors/errors";
import ErrorMessage from "../error-message/ErrorMessage";
import {array, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type LinkInput = {
    name: string;
    url: string;
};

type Inputs = {
    name: string,
    username: string,
    bio: string,
    links: LinkInput[]
};

const schema = object().shape({
    name: string()
        .max(100, getLengthError('Name', {maxLength: 100}))
        .matches(/^[\p{L}\s]*$/u, // matches any alphabetical characters and any whitespace characters
            getFormatError('Name', {alphabetical: true})),
    username: string().required(ERRORS.fieldRequired)
        .max(32, getLengthError('Username', {maxLength: 32}))
        .matches(/^[a-zA-Z0-9]+$/, getFormatError('Username',
            {alphabetical: true, numbers: true})),
    bio: string().max(300),
    links:
        array()
            .of(
                object().shape({
                    name: string()
                        .required(ERRORS.fieldRequired)
                        .max(32, getLengthError('Link Name',
                            {maxLength: 32})),
                    url: string()
                        .required(ERRORS.fieldRequired)
                        .url(ERRORS.linkURLFormat)
                        .max(100, getLengthError('URL', {maxLength: 100})),
                })
            )
            .max(10, ERRORS.maxLinks),
});

const EditProfileForm = () => {
    const {
        register,
        setFocus,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<Inputs>({resolver: yupResolver(schema)});
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        name: "links",
        control,
    });
    useEffect(() => {
        setFocus('name');
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
                    <CustomInput
                        {...register('name')}
                        label='Name'
                        type='text'
                        placeholder='Name'
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>

                    <CustomInput
                        {...register('username')}
                        label='Username (*)'
                        type='text'
                        placeholder='Username'
                    />
                    <ErrorMessage>{errors.username?.message}</ErrorMessage>
                </div>
            </div>

            <div className={classes.container}>
                <h2>Add a short description of you and your works</h2>
                <div className={classes.inputContainer}>
                    <label htmlFor='bio'>
                        Bio
                    </label>
                    <CustomTextArea
                        {...register('bio')}
                        control={control}
                        placeholder='Enter a short Bio'
                        maxLength={300}
                        name='bio'
                    />
                    <ErrorMessage>{errors.bio?.message}</ErrorMessage>
                </div>
            </div>

            <div className={classes.container}>
                <h2>Add links to your social media or websites</h2>

                <div className={classes.inputContainer}>
                    {fields.map((field, index) => {
                        return (
                            <Fragment key={field.id}>
                                <div className={classes.inputContainerRow}>
                                    <CustomInput
                                        label='Link Name'
                                        type='text'
                                        placeholder='Link Name'
                                        {...register(`links.${index}.name`)}
                                    />
                                    <CustomInput
                                        label='Link URL'
                                        type='text'
                                        placeholder='URL'
                                        {...register(`links.${index}.url`)}
                                    />
                                    <button type="button" onClick={() => remove(index)}>
                                        Delete
                                    </button>
                                </div>
                                <ErrorMessage>{errors.links?.[index]?.name?.message}</ErrorMessage>
                                <ErrorMessage>{errors.links?.[index]?.url?.message}</ErrorMessage>
                            </Fragment>
                        );
                    })}
                    {(fields.length < 10)
                        &&
                        <button
                            type="button"
                            onClick={() => {
                                append({
                                    name: "",
                                    url: ""
                                });
                            }}
                        >
                            Add Link
                        </button>
                    }
                </div>
            </div>

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
