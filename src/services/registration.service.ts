import {RegistrationResponse, RegistrationsResponse} from '../responses'
import {RegistrationInput} from '../inputs'
import {RegistrationModel} from '../schema'
import {newRegistrationEmail, paymentNeededEmail} from '../utils'
import {ErrorConstants} from '../constants'
import {Sorting} from '../types'

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
	async getAllRegistrations(sorting: Sorting): Promise<RegistrationsResponse> {
		const registrations = await RegistrationModel.find().sort({
			createdAt: sorting === Sorting.ASC ? 1 : -1,
		})
		if (!registrations) {
			return {
				errors: [
					{
						...ErrorConstants['INTERNAL_SERVER_ERROR'],
					},
				],
				registrations: null,
			}
		}
		return {
			errors: [],
			registrations,
		}
	}
}
export default RegistrationService
