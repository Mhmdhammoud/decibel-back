import 'reflect-metadata'

import {faker} from '@faker-js/faker'
import {testDbConnection,gCall} from '../test-utils'
import {AdminService} from '../services'
import {MeQuery} from '../graphql'

beforeAll(async () => {
	await testDbConnection()
})

// afterAll(async () => {
// 	await (await testDbConnection()).connection.dropCollection('admins')
// 	await (await testDbConnection()).connection.close(true)
// })
describe('Me', () => {
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
