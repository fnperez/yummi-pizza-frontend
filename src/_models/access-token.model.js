export class AccessToken {
    constructor(
        type,
        token
    ) {
        this.type = type;
        this.token = token;
    }

    static fromJson(props) {
        return new AccessToken(
            props.token_type,
            props.token
        );
    }
}