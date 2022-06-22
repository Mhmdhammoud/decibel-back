import 'reflect-metadata'
import {faker} from '@faker-js/faker'
import {
	AddRegisteration, CreateAdmin, ExportData,
	GetAllRegistrations,
	GetSingleRegistration, Login, ToggleActivateRegistration,
} from '../graphql'
import {gCall, testDbConnection} from '../test-utils'
import {RegistrationService} from '../services'
import {RegistrationInput} from '../inputs'
import {RegistrantType, Sorting} from '../types'
import moment from 'moment'

beforeAll(async () => {
	await testDbConnection()
})
describe('Registration', () => {
	const registrationService = new RegistrationService()
	it('Check if email is unique', async () => {
		const registrationPayload: RegistrationInput = {
			email: faker.internet.email(),
			lname: faker.name.lastName(),
			phone: faker.phone.phoneNumber(),
			company_type: faker.company.companyName(),
			registrant_type: RegistrantType.EMPLOYEE,
			country_of_residence: faker.address.country(),
			date_of_birth: moment().format('MM/DD/YYYY') as unknown as Date,
			university: faker.company.companyName(),
			nationality: faker.address.country(),
			fname: faker.name.firstName(),
		}
		const response = await registrationService.addRegisteration(registrationPayload)
		expect(response.errors).toHaveLength(0)
		const uniqueResponseCheck = await registrationService.addRegisteration(registrationPayload)
		expect(uniqueResponseCheck.errors).toHaveLength(1)
	})
	it('New registration', async () => {
		const registrationPayload: RegistrationInput = {
			email: faker.internet.email(),
			lname: faker.name.lastName(),
			phone: faker.phone.phoneNumber(),
			company_type: faker.company.companyName(),
			registrant_type: RegistrantType.EMPLOYEE,
			country_of_residence: faker.address.country(),
			date_of_birth: moment().format('MM/DD/YYYY') as unknown as Date,
			university: faker.company.companyName(),
			nationality: faker.address.country(),
			fname: faker.name.firstName(),
		}
		const response = await gCall({
			source: AddRegisteration,
			variableValues: {
				input: registrationPayload,
			},
		})
		expect(response?.data?.addRegisteration?.registration).toBeDefined()
		expect(response?.data?.addRegisteration?.registration.fullName).toContain(registrationPayload.fname)
		expect(response?.data?.addRegisteration?.registration.fullName).toContain(registrationPayload.lname)
		expect(response?.data?.addRegisteration?.errors).toHaveLength(0)
	})
	it('Get all registrations', async () => {
		const allRegistrationResponse = await gCall({
			source: GetAllRegistrations,
			variableValues: {
					sorting: Sorting.DESC
			},
		})
		expect(allRegistrationResponse?.data?.getAllRegistrations?.registrations).toBeDefined()
		expect(allRegistrationResponse?.data?.getAllRegistrations?.link).toBeDefined()
		expect(allRegistrationResponse?.data?.getAllRegistrations?.errors).toHaveLength(0)
	})
	it('Get single registrations', async () => {
		const registrationPayload:RegistrationInput={
			email: faker.internet.email(),
			lname: faker.name.lastName(),
			phone: faker.phone.phoneNumber(),
			company_type: faker.company.companyName(),
			registrant_type: RegistrantType.EMPLOYEE,
			country_of_residence: faker.address.country(),
			date_of_birth: moment().format('MM/DD/YYYY') as unknown as Date,
			university: faker.company.companyName(),
			nationality:faker.address.country(),
			fname:faker.name.firstName()
		}


		const response= await registrationService.addRegisteration(registrationPayload)
		expect(response.errors).toHaveLength(0)
		const singleRegistrationResponse = await gCall({
			source: GetSingleRegistration,
			variableValues: {
					registrationId: response.registration?.registration_id
			},
		})
		expect(singleRegistrationResponse?.data?.getRegistrations?.registration).toBeDefined()
		expect(singleRegistrationResponse?.data?.getRegistrations?.errors).toHaveLength(0)
	})
	it('Toggle activate registration', async () => {
		const registrationPayload:RegistrationInput={
			email: faker.internet.email(),
			lname: faker.name.lastName(),
			phone: faker.phone.phoneNumber(),
			company_type: faker.company.companyName(),
			registrant_type: RegistrantType.EMPLOYEE,
			country_of_residence: faker.address.country(),
			date_of_birth: moment().format('MM/DD/YYYY') as unknown as Date,
			university: faker.company.companyName(),
			nationality:faker.address.country(),
			fname:faker.name.firstName()
		}

		const response= await registrationService.addRegisteration(registrationPayload)
		expect(response.errors).toHaveLength(0)
		expect(response?.registration?.status).toBeFalsy()
		const toggleActivateRegistrationResponse = await gCall({
			source: ToggleActivateRegistration,
			variableValues: {
					registrationId: response.registration?._id.toString()
			},
		})
		expect(toggleActivateRegistrationResponse?.errors).toBeDefined()
		//@ts-ignore
		expect(toggleActivateRegistrationResponse?.errors[0].message).toContain('Access' +
			' denied! You' +
			' need to be authorized to perform this action!')
		const adminPayload = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		}
		const registrationResponse = await gCall({
			source: CreateAdmin,
			variableValues: {
				input: adminPayload,
			},
		})
		expect(registrationResponse?.data?.createAdmin?.token).toBeDefined()
		expect(registrationResponse?.data?.createAdmin?.errors).toHaveLength(0)
		const loginResponse = await gCall({
			source: Login,
			variableValues: {
				input: adminPayload,
			},
		})
		expect(loginResponse?.data?.login?.token).toBeDefined()
		expect(loginResponse?.data?.login?.errors).toHaveLength(0)
		const authenticatedToggleActivateRegistrationResponse = await gCall({
			source: ToggleActivateRegistration,
			token: loginResponse?.data?.login?.token,
			variableValues: {
				registrationId: response.registration?._id.toString()
			},
		})
		expect(authenticatedToggleActivateRegistrationResponse?.data?.toggleActivateRegistration?.registration).toBeDefined()
		expect(authenticatedToggleActivateRegistrationResponse?.data?.toggleActivateRegistration?.registration.status).toBeTruthy()
		expect(authenticatedToggleActivateRegistrationResponse?.data?.toggleActivateRegistration?.errors).toHaveLength(0)
	})
	it('Export Data', async () => {
		const exportDataResponse = await gCall({
			source: ExportData,
		})
		expect(exportDataResponse?.data?.exportData?.link).toBeDefined()
		expect(exportDataResponse?.data?.exportData?.errors).toHaveLength(0)
	})
})
