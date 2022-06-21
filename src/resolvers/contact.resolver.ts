import {ContactInput, RegistrationInput} from '../inputs'
import {
	AddContactsResponse,
	RegistrationResponse,
	RegistrationsResponse,
} from '../responses'
import {ContactService, RegistrationService} from '../services'
import {Resolver, Mutation, Query, Arg, ID, Authorized} from 'type-graphql'
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
	@Query(() => RegistrationsResponse)
	async getAllRegistrations(
		@Arg('sorting', () => Sorting) sorting: Sorting
	): Promise<RegistrationsResponse> {
		return this.contactService.getAllRegistrations(sorting)
	}
}
export default ContactResolver
