import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {mixed, object, string} from "yup";
import {getLengthError} from "../../errors/errors";
import CustomTextInput from "../UI/text-input/CustomTextInput";
import CustomTextArea from "../UI/textarea/CustomTextArea";
import CustomButton, {ButtonClass} from "../UI/button/CustomButton";
import classes from './PostForm.module.scss';

type Inputs = {
    image: File,
    title?: string,
    description?: string,
};

const schema = object().shape({
    image: mixed().test('fileType', 'Invalid file type', (value) => {
        if (value instanceof File) {
            return value.type.startsWith('image/');
        }
        return false;
    }),
    title: string()
        .max(32, getLengthError('Title', {maxLength: 32})),
    description:
        string().max(300),
});


const PostForm = () => {
    const {
        register,
        setFocus,
        setError,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });


    function onSubmit() {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
            <label htmlFor="image">Choose a picture:</label>
            <input type="file"
                   id="image" name="image"
                   accept="image/*"/>
            <CustomTextInput
                {...register('title')}
                type="text"
                label="Title"
                placeholder='[No Title]'
            />

            <label htmlFor='description'>Description</label>
            <CustomTextArea
                {...register('description')}
                control={control}
                placeholder='[No Description]'
                maxLength={300}
            />
            <CustomButton buttonClass={ButtonClass.PRIMARY}>Upload</CustomButton>
        </form>
    );
};

export default PostForm;