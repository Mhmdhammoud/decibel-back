import {Field, ObjectType} from "type-graphql";

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
class BasicResponse {
    @Field(() => [FieldError])
    errors: FieldError[]
}

export default BasicResponse
