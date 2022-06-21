import {RegistrationResponse} from '../responses'
import {RegistrationInput} from '../inputs'
import {RegistrationModel} from '../schema'
import {newRegistrationEmail, paymentNeededEmail} from '../utils'

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
						field: 'Internal Server Error',
						message:
							'Something went wrong please contact system administrator.',
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
