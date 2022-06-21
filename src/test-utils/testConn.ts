import mongoose from 'mongoose'
import {Logger} from '../lib'

export default async function testDbConnection() {
	try {
		const mongoUri = process.env.TEST_MONGO_URI
		if (!mongoUri) {
			Logger.error(
				'mongoose',
				'connecToDb',
				'Mongo uri was not found',
				'localhost'
			)
			process.exit(1)
		}
		const connection = await mongoose.connect(mongoUri)
		Logger.info(
			'Mongoose',
			'connectToDb',
			`Connected to mongo through, ${mongoUri}`,
			'localhost'
		)
		return connection
	} catch (err) {
		if (err instanceof Error) {
			Logger.error('mongoose', 'connecToDb', err.message, 'localhost')
		}
		process.exit(1)
	}
}
