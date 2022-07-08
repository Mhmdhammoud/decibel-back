import {CleaningService} from '../services'
import {Arg, Authorized, ID, Mutation, Query, Resolver} from 'type-graphql'
import {AddCleaningInput} from '../inputs'
import {AllCleaningResponse, CleaningResponse} from '../responses'

@Resolver()
class CleaningResolver {
	constructor(private readonly cleaningService: CleaningService) {
		this.cleaningService = new CleaningService()
	}

	@Authorized()
	@Mutation(() => CleaningResponse)
	async addCleaning(
		@Arg('input', () => AddCleaningInput) input: AddCleaningInput
	): Promise<CleaningResponse> {
		return this.cleaningService.addCleaning(input)
	}

	@Authorized()
	@Mutation(() => CleaningResponse)
	async deleteCleaning(
		@Arg('input', () => ID) input: string
	): Promise<CleaningResponse> {
		return this.cleaningService.deleteCleaning(input)
	}

	@Query(() => AllCleaningResponse)
	async getAllCleaning(): Promise<AllCleaningResponse> {
		return this.cleaningService.getAllCleaning()
	}
}

export default CleaningResolver
