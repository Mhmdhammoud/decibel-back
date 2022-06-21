import {Field, ObjectType} from 'type-graphql'

@ObjectType()
class FieldError {
	@Field()
	field: string
	@Field()
	message: string
}

@ObjectType()
abstract class BasicResponse {
	@Field(() => [FieldError])
	errors: FieldError[]
}

export default BasicResponse
