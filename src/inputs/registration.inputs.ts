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

	@Field(() => Date, {nullable: true})
	date_of_birth: Date

	@Field(() => String, {nullable: true})
	nationality: String

	@Field(() => String, {nullable: true})
	country_of_residence: String

	@Field(() => String, {nullable: true})
	phone: string
}
