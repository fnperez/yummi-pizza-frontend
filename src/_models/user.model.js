export default class User {
    constructor(
        id,
        name,
        email,
        createdAt,
        updatedAt,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJson(props) {
        return new User(
            props.id,
            props.name,
            props.email,
            props.created_at,
            props.updated_at,
        )
    }
}
