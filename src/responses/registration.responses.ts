import {Registration} from '../schema'
import {Field, ObjectType} from 'type-graphql'
import {BasicError} from '../common'

@ObjectType()
export class RegistrationResponse extends BasicError {
	@Field(() => Registration, {nullable: true})
	registration: Registration | null
}
