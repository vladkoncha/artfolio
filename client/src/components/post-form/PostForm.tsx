import React, {ChangeEvent, useContext, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {mixed, object, string} from "yup";
import {ERRORS, getLengthError} from "../../errors/errors";
import CustomTextInput from "../UI/text-input/CustomTextInput";
import CustomTextArea from "../UI/textarea/CustomTextArea";
import CustomButton, {ButtonClass} from "../UI/button/CustomButton";
import classes from './PostForm.module.scss';
import ImageInput from "../UI/image-input/ImageInput";
import ErrorMessage from "../UI/error-message/ErrorMessage";
import ImagePreview from "../UI/image-preview/ImagePreview";
import {Context} from "../../index";
import {IPost} from "../../models/IPost";
import {observer} from "mobx-react-lite";
import {v4} from 'uuid';

type Inputs = {
    images: FileList | "",
    title?: string,
    description?: string,
};

interface PostFormProps {
    closeForm: () => void;
}

const schema = object().shape({
    images: mixed().test('file', ERRORS.fieldRequired, (value) => {
        if (value instanceof FileList) {
            return value.length > 0;
        }
        return false;
    }).test('fileType', 'Invalid file type', (value) => {
        if (value instanceof FileList) {
            const files = Array.from(value);
            return files.every((file) => file.type.startsWith('image/'));
        }
        return false;
    }),
    title: string()
        .max(32, getLengthError('Title', {maxLength: 32})),
    description:
        string().max(300),
});


const PostForm = ({closeForm}: PostFormProps) => {
    const {store} = useContext(Context);
    const [image, setImage] = useState<File | null>(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const {
        register,
        setError,
        handleSubmit,
        control,
        setValue,
        formState: {errors}
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError("images", {});
        const files = event.target.files;
        if (files === null) {
            return;
        }
        const selectedFile = files[0];

        if (selectedFile.size > 50 * 1e6) {
            setError("images", {
                type: "manual",
                message: "Max file size is 50MB",
            });
            return;
        }
        if (!selectedFile.type.startsWith('image/')) {
            setError("images", {
                type: "manual",
                message: "Invalid file type",
            });
            return;
        }
        setImage(selectedFile);
    };

    async function onSubmit(data: Inputs) {
        setSubmitLoading(true);

        const post: IPost = {
            id: v4(),
            username: store.user.username,
            image: (data.images as FileList).item(0) as File,
            title: data.title || "[No Title]",
            description: data.description || "[No Description]",
            date: new Date(),
        };
        store.addPost(post);

        setSubmitLoading(false);
        closeForm();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
            <label htmlFor="image">Select an image:</label>
            <div className={classes.imageContainer}>
                {image
                    && <ImagePreview
                        imageUrl={URL.createObjectURL(image)}
                        onClose={() => {
                            setImage(null);
                            setValue('images', "");
                        }}
                    />}
                <ImageInput
                    {...register('images')}
                    hidden={image !== null}
                    multiple={false}
                    onChange={handleFileChange}
                />
            </div>
            <ErrorMessage>{errors.images?.message}</ErrorMessage>
            <CustomTextInput
                {...register('title')}
                type="text"
                label="Title"
                placeholder='[No Title]'
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <label htmlFor='description'>Description</label>
            <CustomTextArea
                {...register('description')}
                control={control}
                placeholder='[No Description]'
                maxLength={300}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <CustomButton
                type='submit'
                disabled={submitLoading}
                buttonClass={ButtonClass.PRIMARY}>
                Upload
            </CustomButton>
        </form>
    );
};

export default observer(PostForm);