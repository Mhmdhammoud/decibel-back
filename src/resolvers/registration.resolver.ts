import {RegistrationInput} from '../inputs'
import {RegistrationResponse} from '../responses'
import {RegistrationService} from '../services'
import {Resolver, Mutation, Query, Arg} from 'type-graphql'
import {Sorting} from '../types'

@Resolver()
class RegistrationResolver {
	constructor(private readonly registationService: RegistrationService) {
		this.registationService = new RegistrationService()
	}
	@Mutation(() => RegistrationResponse)
	async addRegisteration(
		@Arg('input', () => RegistrationInput) input: RegistrationInput
	): Promise<RegistrationResponse> {
		return this.registationService.addRegisteration(input)
	}
	@Query(() => Boolean)
	async getAllRegistrations(@Arg('sorting', () => Sorting) sorting: Sorting) {
		return this.registationService.getAllRegistrations(sorting)
	}

	@Query(() => Boolean)
	async exportData() {
		return true
	}
}
export default RegistrationResolver
