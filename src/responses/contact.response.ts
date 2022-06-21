import {Field, ObjectType} from 'type-graphql'
import {BasicError} from '../common'
import {Contact} from '../schema'

@ObjectType()
export class ContactResponse extends BasicError {
	@Field(() => Contact, {nullable: true})
	contact: Contact | null
}

@ObjectType()
export class ContactsResponse extends BasicError {
	@Field(() => [Contact], {nullable: true})
	contacts: Contact[] | null
}

@ObjectType()
export class AddContactsResponse extends BasicError {
	@Field(() => Boolean, {nullable: true})
	success: boolean
}
