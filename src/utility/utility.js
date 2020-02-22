export const pushHistory = (path, history) => {
    history.push(path);
};

export const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}