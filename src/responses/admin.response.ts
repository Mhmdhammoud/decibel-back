import {BasicError} from '../common'
import {Field, ObjectType} from 'type-graphql'
import {Admin} from '../schema'

@ObjectType()
export class AdminResponse extends BasicError {
	@Field(() => Admin, {nullable: true})
	admin: Admin | null
}
