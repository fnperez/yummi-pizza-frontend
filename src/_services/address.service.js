import { checkResponse } from "../_helpers";
import { Address } from "../_models";

const add = async (props) => {
    const body = new URLSearchParams();

    body.append('street_name', props.street_name);
    body.append('street_number', props.street_number);
    body.append('floor', props.floor);
    body.append('state', props.state);
    body.append('city', props.city);
    body.append('phone_number', props.phone_number);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    };
    
    return fetch(`${window.api.url}/addresses`, requestOptions)
        .then(checkResponse)
        .then(response => Address.fromJson(response.data))
}

export const addressService = {
    add,
}