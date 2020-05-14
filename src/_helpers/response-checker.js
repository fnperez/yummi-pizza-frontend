import { authActions } from "../_actions";

export function checkResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            switch (response.status) {
                case 401:
                    authActions.logout();
                    
                    return Promise.reject(data);
                case 403:
                case 400:
                case 422:
                    return Promise.reject({
                        type: 'warning',
                        status: data.status ?? response.status,
                        title: data.message,
                        description: data.description,
                        errors: data.errors ?? []
                    });
                default:
                    return Promise.reject({
                        type: 'error',
                        title: "Sorry!",
                        status: data.status ?? response.status,
                        description: data.error ?? "Something went wrong, try later.",
                        errors: []
                    });
            }    
        }

        return data;
    });
}
