import Joi from 'joi'
class CredentialModel {
    public username: string
    public password: string
    
    public constructor(credential: CredentialModel) {
        this.username = credential.username
        this.password = credential.password
    }

    public static validationSchema = Joi.object({
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(8).max(8)
    })

    public validate(): string {
        const resoult = CredentialModel.validationSchema.validate(this)
        return resoult.error?.message
    }

}

export default CredentialModel