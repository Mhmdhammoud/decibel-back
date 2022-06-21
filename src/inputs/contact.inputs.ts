import {IsEmail} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType()
export class ContactInput {
	@Field(() => String)
	fname: string

	@Field(() => String)
	lname: string

	@Field(() => String)
	phone: string

	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => String)
	message: string
}
