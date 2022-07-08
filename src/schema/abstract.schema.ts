import {Field, ID, ObjectType} from 'type-graphql'
@ObjectType()
export abstract class AbstractSchema {
	@Field(() => ID)
	_id: string

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
