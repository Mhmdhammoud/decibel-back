import {IsEmail} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType()
export class RegistrationInput {
	@Field(() => String)
	fname: string

	@Field(() => String)
	lname: string

	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => String, {nullable: true})
	phone: string
}
