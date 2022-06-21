import {AddContactsResponse} from '../responses'
import {ErrorConstants} from '../constants'
import {ContactModel} from '../schema'
import {ContactInput} from '../inputs'

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
}
export default ContactService
