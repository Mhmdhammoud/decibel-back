import mongoose from 'mongoose'
import {Logger} from './index'

export default async function connectToDb() {
	try {
		const mongoUri = process.env.MONGO_URI
		if (!mongoUri) {
			Logger.error(
				'mongoose',
				'connecToDb',
				'Mongo uri was not found',
				'localhost'
			)
			process.exit(1)
		}
		await mongoose.connect(mongoUri)
		Logger.info(
			'Mongoose',
			'connectToDb',
			`Connected to mongo through, ${mongoUri}`,
			'localhost'
		)
	} catch (err) {
		if (err instanceof Error) {
			Logger.error('mongoose', 'connecToDb', err.message, 'localhost')
		}
		process.exit(1)
	}
}
