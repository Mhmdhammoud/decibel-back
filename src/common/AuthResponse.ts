import {Field, ObjectType} from 'type-graphql'
import {BasicError} from "./index";

@ObjectType()
class AuthResponse extends BasicError {
    @Field(() => String, {nullable: true})
    token?: string | null
}

export default AuthResponse
