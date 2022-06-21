import {RegistrationResponse} from '../responses'
import {RegistrationInput} from '../inputs'
import {RegistrationModel} from '../schema'
import {newRegistrationEmail, paymentNeededEmail} from '../utils'
import {ErrorConstants} from 'src/constants'

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
		if (!registration) {
			return {
				errors: [
					{
						...ErrorConstants['INTERNAL_SERVER_ERROR'],
					},
				],
				registration: null,
			}
		}
		newRegistrationEmail()
		paymentNeededEmail(registration.email)
		return {
			errors: [],
			registration,
		}
	}
}
export default RegistrationService
