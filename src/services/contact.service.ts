import {AddContactsResponse, ContactsResponse} from '../responses'
import {ErrorConstants} from '../constants'
import {ContactModel} from '../schema'
import {ContactInput} from '../inputs'
import {Sorting} from '../types'

class ContactService {
	async addContact(input: ContactInput): Promise<AddContactsResponse> {
		const contact = await ContactModel.create(input)
		if (!contact) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				success: false,
			}
		}
		return {
			errors: [],
			success: true,
		}
	}
	async getAllContacts(sorting: Sorting): Promise<ContactsResponse> {
		const contacts = await ContactModel.find().sort({
			createdAt: sorting === Sorting.ASC ? 1 : -1,
		}).lean()
		if (!contacts) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				contacts: null,
			}
		}
		return {
			errors: [],
			contacts,
		}
	}
}
export default ContactService
