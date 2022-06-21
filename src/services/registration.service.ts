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
import mongoose from 'mongoose'

class RegistrationService {
	async addRegisteration(
		input: RegistrationInput
	): Promise<RegistrationResponse> {
		const isFound = await RegistrationModel.find().findByEmail(input.email)
		if (isFound) {
			return {
				errors: [ErrorConstants['ALREADY_REGISTERED']],
				registration: null,
			}
		}
		const registration_created = await RegistrationModel.create(input)
		const registration = await RegistrationModel.findById(
			registration_created._id
		).lean()
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
		if (!mongoose.isValidObjectId(registration_id)) {
			return {
				errors: [ErrorConstants['INVALID_ID']],
				registration: null,
			}
		}
		const registration = await RegistrationModel.findById(registration_id)
		if (!registration) {
			return {
				errors: [ErrorConstants['REGISTRATION_NOT_FOUND']],
				registration: null,
			}
		}
		const registrationUpdate = await RegistrationModel.findByIdAndUpdate(
			registration_id,
			{
				$set: {
					status: true,
				},
			}
		)

		if (!registrationUpdate) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				registration: null,
			}
		}
		const updatedRegistration = await RegistrationModel.findById(
			registration_id
		).lean()
		if (!updatedRegistration) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				registration: null,
			}
		}
		registrationActivatedEmail(updatedRegistration.email)
		return {
			errors: [],
			registration: updatedRegistration,
		}
	}
}
export default RegistrationService
