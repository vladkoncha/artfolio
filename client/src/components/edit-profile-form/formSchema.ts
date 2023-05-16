import {array, object, string} from "yup";
import {ERRORS, getFormatError, getLengthError} from "../../errors/errors";

export const schema = object().shape({
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
                        .max(32, getLengthError('Link Name',
                            {maxLength: 32})),
                    url: string()
                        .url(ERRORS.linkURLFormat)
                        .max(100, getLengthError('URL', {maxLength: 100})),
                })
            )
            .max(10, ERRORS.maxLinks),
});