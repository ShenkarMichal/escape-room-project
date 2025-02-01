
class CredentialModel {
    public username: string
    public password: string

    public static usernameValidation: {
        required: {value: true, message: "Username is missing"},
        min: {value: 2, message: "Username is too short"},
        max: {value: 20, message: "Username is too long"}
    }

    public static passwordValidation: {
        required: {value: true, message: "Password is missing"},
        min: {value: 8, message: "Password is too short"},
        max: {value: 8, message: "Password is too long"}
    }
}

export default CredentialModel