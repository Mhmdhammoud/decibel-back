import {IsEmail} from 'class-validator'
import {Field, InputType} from 'type-graphql'
import {RegistrantType} from '../types'

@InputType()
export class RegistrationInput {
	@Field(() => String)
	fname: string

	@Field(() => String)
	lname: string

	@Field(() => String)
	phone: string

	@Field(() => String)
	nationality: String

	@Field(() => String)
	country_of_residence: String

	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => Date)
	date_of_birth: Date

	@Field(() => RegistrantType)
	registrant_type: RegistrantType

	@Field(() => String, {nullable: true})
	university: string

	@Field(() => String, {nullable: true})
	company_type: string
}
