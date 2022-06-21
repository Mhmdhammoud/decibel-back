import {RegistrationResponse, RegistrationsResponse} from '../responses'
import {RegistrationInput} from '../inputs'
import {RegistrationModel} from '../schema'
import {
	newRegistrationEmail,
	paymentNeededEmail,
	registrationActivatedEmail,
} from '../utils'
import {ErrorConstants} from '../constants'
import {Sorting} from '../types'

class RegistrationService {
	async addRegisteration(
		input: RegistrationInput
	): Promise<RegistrationResponse> {
		const isFound = await RegistrationModel.find().findByEmail(input.email)
		if (isFound) {
			return {
				errors: [ErrorConstants['ADMIN_NOT_FOUND']],
				registration: null,
			}
		}
		const registration = await RegistrationModel.create(input)
		if (!registration) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
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
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				registrations: null,
			}
		}
		return {
			errors: [],
			registrations,
		}
	}
	async activateRegistration(
		registration_id: string
	): Promise<RegistrationResponse> {
		const registration = await RegistrationModel.findById(registration_id)
		if (!registration) {
			return {
				errors: [ErrorConstants['REGISTRATION_NOT_FOUND']],
				registration: null,
			}
		}
		const updatedRegistration = await RegistrationModel.findByIdAndUpdate(
			registration_id,
			{
				$set: {
					status: true,
				},
			},
			{new: true}
		)
		if (!updatedRegistration) {
			return {
				errors: [
					{
						...ErrorConstants['INTERNAL_SERVER_ERROR'],
					},
				],
				registration: null,
			}
		}
		registrationActivatedEmail(registration.email)
		return {
			errors: [],
			registration: updatedRegistration,
		}
	}
}
export default RegistrationService
