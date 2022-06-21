import {Field, ObjectType} from 'type-graphql'
import {BasicError} from '../common'
import {Registration} from '../schema'

@ObjectType()
export class RegistrationResponse extends BasicError {
	@Field(() => Registration, {nullable: true})
	registration: Registration | null
}

@ObjectType()
export class RegistrationsResponse extends BasicError {
	@Field(() => [Registration], {nullable: true})
	registrations: Registration[] | null
}
