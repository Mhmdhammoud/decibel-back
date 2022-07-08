import {CleaningModel} from '../schema'
import {AddCleaningInput} from '../inputs'
import {AllCleaningResponse, CleaningResponse} from '../responses'
import {ErrorConstants} from '../constants'
import mongoose from 'mongoose'
class CleaningService {
	async addCleaning(input: AddCleaningInput): Promise<CleaningResponse> {
		const createdCleaning = await CleaningModel.create(input)
		if (!createdCleaning) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				cleaning: null,
			}
		}
		return {
			errors: [],
			cleaning: createdCleaning,
		}
	}
	async getAllCleaning(): Promise<AllCleaningResponse> {
		const allCleaning = await CleaningModel.find().lean()
		return {
			errors: [],
			cleanings: allCleaning,
		}
	}
	async deleteCleaning(input: string): Promise<CleaningResponse> {
		if (!mongoose.isValidObjectId(input)) {
			return {
				errors: [ErrorConstants['INVALID_ID']],
				cleaning: null,
			}
		}
		await CleaningModel.findByIdAndDelete(input)
		return {
			errors: [],
			cleaning: null,
		}
	}
}
export default CleaningService
