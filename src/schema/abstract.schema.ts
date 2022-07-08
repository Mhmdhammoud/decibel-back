import {Field, ID} from 'type-graphql'

export abstract class AbstractSchema {
	@Field(() => ID)
	_id: string

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}
