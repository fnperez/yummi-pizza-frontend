const authHeader = () => {
    const accessToken = getAccessToken();

    if (accessToken) {
        return { 'Authorization': accessToken.type + ' ' + accessToken.token };
    }

    return {};
}

const getAccessToken = () => {
    const data = localStorage.getItem('accessToken');
    const accessToken = data ? JSON.parse(data) : undefined;

    console.log(data, accessToken);

    return accessToken;
}

const isLoggedIn = () => {
    return getAccessToken() !== undefined;
}

export {authHeader, getAccessToken, isLoggedIn }