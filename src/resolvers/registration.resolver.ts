import {RegistrationInput} from '../inputs'
import {RegistrationResponse, RegistrationsResponse} from '../responses'
import {RegistrationService} from '../services'
import {Resolver, Mutation, Query, Arg, ID, Authorized} from 'type-graphql'
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
	@Query(() => RegistrationsResponse)
	async getAllRegistrations(
		@Arg('sorting', () => Sorting) sorting: Sorting
	): Promise<RegistrationsResponse> {
		return this.registationService.getAllRegistrations(sorting)
	}
	@Authorized()
	@Mutation(() => RegistrationResponse)
	async activateRegistration(
		@Arg('registration_id', () => ID) registration_id: string
	): Promise<RegistrationResponse> {
		return this.registationService.activateRegistration(registration_id)
	}

	@Query(() => Boolean)
	async exportData() {
		return true
	}
}
export default RegistrationResolver
