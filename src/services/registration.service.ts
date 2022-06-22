import {
	RegistrationResponse,
	RegistrationsData,
	RegistrationsResponse,
} from '../responses'
import {RegistrationInput} from '../inputs'
import {RegistrationModel} from '../schema'
import {
	newRegistrationEmail,
	paymentNeededEmail,
	registrationActivatedEmail,
} from '../utils'
import {
	DATA_FILE_NAMING,
	DATE_FORMAT,
	DATE_TIME_FORMAT,
	ErrorConstants,
} from '../constants'
import {Sorting} from '../types'
import mongoose from 'mongoose'
import exceljs from 'exceljs'
import moment from 'moment'
import {countries} from '../data'
import UtilitiesService from './utilities.service'
import {unlinkSync} from 'fs'
class RegistrationService {
	utilitiesSerivce: UtilitiesService
	constructor() {
		this.utilitiesSerivce = new UtilitiesService()
	}
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
	async getRegistration(registration_id: string): Promise<RegistrationResponse> {
		return {
			errors:[],
			registration: await RegistrationModel.find().findByRegistrationId(registration_id).lean(),
		}
	}
	async getAllRegistrations(sorting: Sorting): Promise<RegistrationsResponse> {
		const registrations = await RegistrationModel.find().sort({
			createdAt: sorting === Sorting.ASC ? 1 : -1,
		}).lean()
		if (!registrations) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				registrations: null,
				link: null,
			}
		}
		const uploadDataResponse = await this.exportData()
		if (uploadDataResponse.errors && uploadDataResponse.errors.length > 0) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				registrations: null,
				link: null,
			}
		}
		const {link} = uploadDataResponse
		return {
			errors: [],
			registrations,
			link,
		}
	}
	async toggleActivateRegistration(
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
					status: !registration.status,
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
	async exportData(): Promise<RegistrationsData> {
		const registrations = await RegistrationModel.find()
		if (!registrations) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				link: null,
			}
		}
		const workbook = new exceljs.Workbook() // Create a new workbook
		const worksheet = workbook.addWorksheet(DATA_FILE_NAMING) // New Worksheet
		worksheet.columns = [
			{header: 'First Name', key: 'fname'},
			{header: 'Last Name', key: 'lname'},
			{header: 'Email', key: 'email'},
			{header: 'Full Name', key: 'full_name'},
			{header: 'Phone Number', key: 'phone'},
			{header: 'Date of birth', key: 'date_of_birth'},
			{header: 'nationality', key: 'nationality'},
			{header: 'Country of Residence', key: 'country_of_residence'},
			{header: 'Registrant type', key: 'registrant_type'},
			{header: 'University', key: 'university'},
			{header: 'Company type', key: 'company_type'},
			{header: 'Registration Status', key: 'status'},
			{header: 'Registered at', key: 'createdAt'},
		]
		registrations.map((item) => {
			const payload = {
				fname: item.fname?.toUpperFirst(),
				lname: item.lname?.toUpperFirst(),
				email: item.email,
				full_name: item.fullName?.toUpperFirst(),
				phone: item.phone,
				date_of_birth: moment(item.date_of_birth).format(DATE_FORMAT),
				nationality: countries.find((el) => el.code === item.nationality)
					?.label,
				country_of_residence: countries.find(
					(el) => el.code === item.country_of_residence
				)?.label,
				registrant_type: item.registrant_type?.toUpperFirst(),
				university: item.university?.toUpperFirst(),
				company_type: item.company_type?.toUpperFirst(),
				status: item.status ? 'Activated' : 'Pending',
				createdAt: moment(item.createdAt).format(DATE_TIME_FORMAT),
			}
			worksheet.addRow(payload)
		})
		const localDirectory = `${process.cwd()}/registrations.xlsx`
		await workbook.xlsx.writeFile(localDirectory)
		const bucketDir = `decibel/reports/registrations.xlsx`
		const data = await this.utilitiesSerivce.uploadLocalFile(
			localDirectory,
			bucketDir
		)
		unlinkSync(localDirectory)
		if (data.errors && data.errors?.length > 0) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				link: '',
			}
		}
		return {
			errors: [],
			link: data.file as string | null,
		}
	}
}
export default RegistrationService
