import React, {ChangeEvent, FormEvent, useState} from 'react';
import CustomButton, {ButtonClass} from "../button/CustomButton";
import classes from './EditProfileForm.module.css';
import CustomInput from "../input/CustomInput";
import CustomTextArea from "../textarea/CustomTextArea";

const EditProfileForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [links, setLinks] = useState([]);
    const [bannerImage, setBannerImage] = useState(null);
    const [pfpImage, setPfpImage] = useState(null);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value);
    };

    // const handleLinkAdd = (link) => {
    //     setLinks([...links, link]);
    // };

    // const handleLinkRemove = (index) => {
    //     const newLinks = [...links];
    //     newLinks.splice(index, 1);
    //     setLinks(newLinks);
    // };

    // const handleBannerImageChange = (event) => {
    //     setBannerImage(event.target.files[0]);
    // };
    //
    // const handlePfpImageChange = (event) => {
    //     setPfpImage(event.target.files[0]);
    // };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform form submission
    };

    return (
        <form onSubmit={handleSubmit} className={classes.editProfileForm}>
            <h1>Edit your profile</h1>

            <div className={classes.container}>
                <h2>Enter your details</h2>

                <div className={classes.inputContainer}>
                    <label>
                        Name
                        <CustomInput
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={handleNameChange}/>
                    </label>
                    <label>
                        Username
                        <CustomInput
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={handleUsernameChange}/>
                    </label>
                </div>
            </div>

            <div className={classes.container}>
                <h2>Add a short description of you and your works</h2>
                <div className={classes.inputContainer}>
                    <label>
                        Bio
                        <CustomTextArea
                            placeholder='Enter a short Bio'
                            maxLength={300}
                            value={bio}
                            onChange={handleBioChange}
                        />
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
