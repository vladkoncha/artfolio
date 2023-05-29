import React, {forwardRef, Ref, useState, InputHTMLAttributes} from 'react';
import classes from './CustomTextInput.module.scss';
import passwordStyles from './PasswordInput.module.css';
import showIcon from '../../../media/icons/password-eye.svg';
import hideIcon from '../../../media/icons/password-eye-off.svg';
import CustomTextInput from "./CustomTextInput";

const PasswordInputWithToggle = forwardRef(
    (props: InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {
        const [showPassword, setShowPassword] = useState(false);

        function togglePasswordVisibility() {
            setShowPassword(!showPassword);
        }

        return (
            <div className={passwordStyles.passwordInputContainer}>
                <CustomTextInput
                    className={[classes.customInput, classes.password].join(' ')}
                    type={showPassword ? 'text' : 'password'}
                    label='Password'
                    name="password"
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    className={passwordStyles.togglePasswordVisibilityButton}
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <img src={hideIcon} alt="Hide password"/>
                    ) : (
                        <img src={showIcon} alt="Show password"/>
                    )}
                </button>
            </div>
        );
    }
);

export default PasswordInputWithToggle;
