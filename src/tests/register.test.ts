import 'reflect-metadata'
import {faker} from '@faker-js/faker'
import {CreateAdmin} from '../graphql'
import {gCall,testDbConnection} from '../test-utils'
import {AdminService} from '../services'

beforeAll(async () => {
	await testDbConnection()
})
describe('Create Admin', () => {
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
	it('Check if admin created', async () => {
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

})
