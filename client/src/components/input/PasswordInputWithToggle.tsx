import React, {forwardRef, Ref, useState, InputHTMLAttributes} from 'react';
import classes from './CustomInput.module.css';
import passwordStyles from './PasswordInput.module.css';
import showIcon from '../../media/icons/password-eye.svg';
import hideIcon from '../../media/icons/password-eye-off.svg';

const PasswordInputWithToggle = forwardRef(
    (props: InputHTMLAttributes<HTMLInputElement>, ref: Ref<HTMLInputElement>) => {
        const [showPassword, setShowPassword] = useState(false);

        function togglePasswordVisibility() {
            setShowPassword(!showPassword);
        }

        return (
            <div className={passwordStyles.passwordInputContainer}>
                <input
                    className={[classes.customInput, classes.password].join(' ')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    ref={ref}
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
