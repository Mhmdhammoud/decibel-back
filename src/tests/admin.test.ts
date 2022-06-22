import 'reflect-metadata'
import {faker} from '@faker-js/faker'
import {CreateAdmin, Login, MeQuery} from '../graphql'
import {gCall,testDbConnection} from '../test-utils'
import {AdminService} from '../services'

beforeAll(async () => {
	await testDbConnection()
})
describe('Authorization', () => {
	const userService = new AdminService()
	it('Check if email is unique', async () => {
		const adminPayload={
			email: faker.internet.email(),
			password: faker.internet.password(),
		}
		const response= await userService.createAdmin(adminPayload)
		expect(response.errors).toHaveLength(0)
		const uniqueResponseCheck= await userService.createAdmin(adminPayload)
		expect(uniqueResponseCheck.errors).toHaveLength(1)
	})
	it('Register new Admin', async () => {
		const adminPayload = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		}
		const response = await gCall({
			source: CreateAdmin,
			variableValues: {
				input: adminPayload,
			},
		})
		expect(response?.data?.createAdmin?.token).toBeDefined()
		expect(response?.data?.createAdmin?.errors).toHaveLength(0)
	})
	it('Login Admin account', async () => {
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
	})
	it('get admin', async () => {
		const userService = new AdminService()
		const {token} = await userService.createAdmin({
			email: faker.internet.email(),
			password: faker.internet.password(),
		})
		const response = await gCall({
			source: MeQuery,
			token: token ? token : '',
		})
		expect(response.data).toBeDefined()
	})
})
