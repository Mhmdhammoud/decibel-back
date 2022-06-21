import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {ContactInput} from '../inputs'
import {AddContactsResponse, ContactsResponse} from '../responses'
import {ContactService} from '../services'
import {Sorting} from '../types'

@Resolver()
class ContactResolver {
	constructor(private readonly contactService: ContactService) {
		this.contactService = new ContactService()
	}
	@Mutation(() => AddContactsResponse)
	async addContact(
		@Arg('input', () => ContactInput) input: ContactInput
	): Promise<AddContactsResponse> {
		return this.contactService.addContact(input)
	}
	@Query(() => ContactsResponse)
	async getAllContacts(
		@Arg('sorting', () => Sorting) sorting: Sorting
	): Promise<ContactsResponse> {
		return this.contactService.getAllContacts(sorting)
	}
}
export default ContactResolver
