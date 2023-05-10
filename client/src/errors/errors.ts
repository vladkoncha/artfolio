export const ERRORS = {
    credits: "Invalid email or password",
    unknown: "Unknown error",
    emailFormat: "Enter a valid email address",
    fieldRequired: "This field is required",
    maxLinks: "You can't add more than 10 links to your profile",
    linkURLFormat: "Enter a valid URL",
};

export function getLengthError(propName: string, {minLength = 0, maxLength = 0}): string {
    if ((minLength > 0) && (maxLength > 0)) {
        return `Enter ${propName} (${minLength} to ${maxLength} characters)`;
    } else if (minLength > 0) {
        return `Enter ${propName} longer than ${minLength} characters`;
    }
    return `${propName} length must not exceed ${maxLength} characters`;
}

export function getFormatError(propName: string,
                               {
                                   alphabetical = false,
                                   numbers = false
                               }): string {
    const formatProperties = [];
    if (alphabetical) {
        formatProperties.push("alphabetical characters");
    }
    if (numbers) {
        formatProperties.push("numbers");
    }
    return `${propName} must contain only ${formatProperties.join(" and ")}`;
}