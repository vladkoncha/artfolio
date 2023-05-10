import React, {useEffect, useRef} from 'react';
import CustomButton, {ButtonClass} from "../button/CustomButton";
import classes from './EditProfileForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomTextArea from "../textarea/CustomTextArea";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {ERRORS} from "../../errors/errors";
import ErrorMessage from "../error-message/ErrorMessage";

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
    const nameRef = useRef<HTMLInputElement | null>(null);
    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<Inputs>();
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        name: "links",
        control,
        rules: {
            maxLength: {value: 10, message: ERRORS.maxLinks}
        }
    });
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

            <div className={classes.container}>
                <h2>Add links to your social media or websites</h2>

                <div className={classes.inputContainer}>
                    {fields.map((field, index) => {
                        return (
                            <>
                                <div key={field.id} className={classes.inputContainerRow}>
                                    <label>
                                        Link Name
                                        <CustomInput
                                            type='text'
                                            placeholder='Link Name'
                                            {...register(`links.${index}.name`, {
                                                required: ERRORS.fieldRequired,
                                                maxLength: {value: 32, message: ERRORS.linkNameLength},
                                                pattern: {
                                                    value: /^[\p{L}\s]+$/u,
                                                    message: ERRORS.linkNameFormat
                                                }
                                            })}
                                        />
                                    </label>
                                    <label>
                                        Link URL
                                        <CustomInput
                                            type='text'
                                            placeholder='URL'
                                            {...register(`links.${index}.url`, {
                                                required: ERRORS.fieldRequired,
                                                maxLength: {value: 100, message: ERRORS.linkURLLength},
                                                pattern: {
                                                    value: /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)+\S*/,
                                                    message: ERRORS.linkURLFormat
                                                }
                                            })}
                                        />
                                    </label>
                                    <button type="button" onClick={() => remove(index)}>
                                        Delete
                                    </button>
                                </div>
                                <ErrorMessage>{errors.links?.[index]?.name?.message}</ErrorMessage>
                                <ErrorMessage>{errors.links?.[index]?.url?.message}</ErrorMessage>
                            </>
                        );
                    })}
                    <button
                        type="button"
                        onClick={() => {
                            append({
                                name: "",
                                url: ""
                            });
                        }}
                    >
                        Append
                    </button>
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
