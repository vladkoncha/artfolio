import React, {Fragment, useContext, useEffect, useState} from 'react';
import CustomButton, {ButtonClass} from "../button/CustomButton";
import classes from './EditProfileForm.module.scss';
import CustomInput from "../input/CustomInput";
import CustomTextArea from "../textarea/CustomTextArea";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import ErrorMessage from "../error-message/ErrorMessage";
import {yupResolver} from "@hookform/resolvers/yup";
import IconButton, {IconType} from "../button/icon-button/IconButton";
import {schema} from "./formSchema";
import {ERRORS} from "../../errors/errors";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

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

const EditProfileForm = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const {
        register,
        setFocus,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: store.user.name,
            username: store.user.username,
            bio: store.user.bio,
            links: store.user.links.concat([{name: "", url: ""}])
        }
    });
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
        setErrorMessage('');
        setSubmitLoading(true);
        try {
            const user = store.user;
            user.name = data.name || "";
            user.username = data.username || "";
            user.bio = data.bio || "";
            user.links = data.links.filter(link => link.name && link.url);
            await store.updateProfileInfo(user);
            navigate('/profile');
        } catch (e: any) {
            setErrorMessage(ERRORS.unknown);
            console.log(e.response?.data);
        } finally {
            setSubmitLoading(false);
        }
    };

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
                <h2>Tell about yourself and your works</h2>
                <div className={classes.inputContainer}>
                    <label htmlFor='bio'>
                        Bio
                    </label>
                    <CustomTextArea
                        {...register('bio')}
                        control={control}
                        defaultValue={store.user.bio}
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
                                    <IconButton iconType={IconType.REMOVE} type="button" onClick={() => remove(index)}/>
                                </div>
                                <ErrorMessage>{errors.links?.[index]?.name?.message}</ErrorMessage>
                                <ErrorMessage>{errors.links?.[index]?.url?.message}</ErrorMessage>
                            </Fragment>
                        );
                    })}
                    {(fields.length < 10)
                        &&
                        <CustomButton
                            onClick={() => {
                                append({
                                    name: "",
                                    url: ""
                                });
                            }}
                            buttonClass={ButtonClass.SECONDARY}
                        >
                            Add Link
                        </CustomButton>
                    }
                </div>
            </div>

            <CustomButton
                disabled={submitLoading}
                type='submit'
                buttonClass={ButtonClass.PRIMARY}
            >
                Save Changes
            </CustomButton>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </form>
    );
};

export default EditProfileForm;
