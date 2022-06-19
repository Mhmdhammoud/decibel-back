import {RegistrationResponse} from '../responses'
import {RegistrationInput} from '../inputs'
import {RegistrationModel} from '../schema'
import {newRegistrationEmail} from '../utils'

class RegistrationService {
	async addRegisteration(
		input: RegistrationInput
	): Promise<RegistrationResponse> {
		const isFound = await RegistrationModel.find().findByEmail(input.email)
		if (isFound) {
			return {
				errors: [
					{
						field: 'email',
						message: 'email already exists',
					},
				],
				registration: null,
			}
		}
		const registration = await RegistrationModel.create(input)
		newRegistrationEmail()
		return {
			errors: [],
			registration,
		}
	}
}
export default RegistrationService
