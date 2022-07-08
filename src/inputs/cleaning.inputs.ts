import {Field, InputType} from 'type-graphql'

@InputType()
export class AddCleaningInput {
	@Field(() => String)
	title: string

	@Field(() => String)
	description: string

	@Field(() => String)
	image: string
}
