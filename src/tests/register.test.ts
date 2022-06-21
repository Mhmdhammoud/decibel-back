import 'reflect-metadata'
import {faker} from '@faker-js/faker'
import {CreateAdmin} from '../graphql'
import {gCall,testDbConnection} from '../test-utils'

beforeAll(async () => {
	await testDbConnection()
})
afterAll(async () => {
	await (await testDbConnection()).connection.dropCollection('admins')
	await (await testDbConnection()).connection.close(true)
})

describe('Create User', () => {
	it('Check if user exists', async () => {
		const userPayload = {
			email: faker.internet.email(),
			password: faker.internet.password(),
		}
		const response = await gCall({
			source: CreateAdmin,
			variableValues: {
				input: userPayload,
			},
		})
		expect(response?.data?.createAdmin?.token).toBeDefined()
		expect(response?.data?.createAdmin?.errors).toHaveLength(0)
	})
})
