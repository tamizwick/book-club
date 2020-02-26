export const pushHistory = (path, history) => {
    history.push(path);
};

export const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const checkValidity = (event, inputElement, valErrors) => {
    let isValid = true;
    const fieldName = capitalizeString(inputElement.key.replace('_', ' '));
    const validationErrors = {
        ...valErrors,
        [inputElement.key]: []
    };
    if (inputElement.validationRules.minLength) {
        isValid = event.target.value.length >= inputElement.validationRules.minLength;
        if (!isValid) {
            validationErrors[inputElement.key].push(`${fieldName} must be ${inputElement.validationRules.minLength} characters.`)
        }
    }
    return validationErrors;
}

export const matchPasswords = (method, passValue, confirmValue, valErrors) => {
    if (method === 'inputHandler') {
        const validationErrors = {
            ...valErrors,
            passwordMatch: []
        };
        if (passValue !== confirmValue) {
            validationErrors.passwordMatch.push(`Passwords must match.`);
        }
        return validationErrors;
    } else if (method === 'submitHandler') {
        return passValue === confirmValue;
    }
}