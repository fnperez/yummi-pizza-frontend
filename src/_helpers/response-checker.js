export function checkResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    logout();
                    return Promise.reject(data);
                case 403:
                case 400:
                case 422:
                    return Promise.reject(data);
                default:
                    const error = { message: "Something went wrong, try later." }

                    return Promise.reject(error);
            }    
        }

        return data;
    });
}

export function logout() {
    localStorage.removeItem('user');
}