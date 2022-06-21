import {IsEmail} from 'class-validator'
import {Field, InputType} from 'type-graphql'
import {RegistrantType} from '../types'

@InputType()
export class RegistrationInput {
	@Field(() => String)
	fname: string

	@Field(() => String)
	lname: string

	@Field(() => String, {nullable: true})
	phone: string

	@Field(() => String, {nullable: true})
	nationality: String

	@Field(() => String, {nullable: true})
	country_of_residence: String

	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => Date, {nullable: true})
	date_of_birth: Date

	@Field(() => RegistrantType, {nullable: true})
	registrant_type: RegistrantType

	@Field(() => String, {nullable: true})
	university: string

	@Field(() => String, {nullable: true})
	company_type: string
}
