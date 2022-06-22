import 'reflect-metadata'
import {faker} from '@faker-js/faker'
import {AddContact, CreateAdmin, GetAllContacts} from '../graphql'
import {gCall, testDbConnection} from '../test-utils'
import {ContactInput, LoginInput} from '../inputs'
import {Sorting} from '../types'
import {ErrorConstants} from '../constants'

beforeAll(async () => {
	await testDbConnection()
})
describe('Contacts', () => {
	it('Add new Contact', async () => {
		const contactPayload:ContactInput={
			email: faker.internet.email(),
			lname: faker.name.lastName(),
			phone: faker.phone.phoneNumber(),
			fname: faker.name.firstName(),
			message: faker.lorem.paragraph(),
		}
		const response = await gCall({
			source: AddContact,
			variableValues: {
				input: contactPayload,
			},
		})
		expect(response?.data?.addContact?.success).toBeTruthy()
		expect(response?.data?.addContact?.errors).toHaveLength(0)
	})
	it('Get all contacts', async () => {
		const unAuthorizedResponse = await gCall({
			source: GetAllContacts,
			variableValues: {
				sorting: Sorting.DESC,
			},
		})
		expect(unAuthorizedResponse?.errors).toBeDefined()
		//@ts-ignore
		expect(unAuthorizedResponse?.errors[0].message).toContain(ErrorConstants['UNAUTHORIZED'].message)
		const adminPayload:LoginInput = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		}
		const loginResponse = await gCall({
			source: CreateAdmin,
			variableValues: {
				input: adminPayload,
			},
		})
		expect(loginResponse?.data?.createAdmin?.token).toBeDefined()
		expect(loginResponse?.data?.createAdmin?.errors).toHaveLength(0)

		const authorizedResponse = await gCall({
			source: GetAllContacts,
			token: loginResponse?.data?.createAdmin?.token,
			variableValues: {
				sorting: Sorting.DESC,
			},
		})
		expect(authorizedResponse?.data?.getAllContacts?.contacts).toBeDefined()
		expect(authorizedResponse?.data?.getAllContacts?.errors).toHaveLength(0)
	})
})
