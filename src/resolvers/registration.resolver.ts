import {RegistrationInput} from '../inputs'
import {
	RegistrationResponse,
	RegistrationsData,
	RegistrationsResponse,
} from '../responses'
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
	@Query(() => RegistrationResponse)
	async getRegistrations(
		@Arg('registration_id', () => ID) registration_id: string
	): Promise<RegistrationResponse> {
		return this.registationService.getRegistration(registration_id)
	}
	@Authorized()
	@Mutation(() => RegistrationResponse)
	async toggleActivateRegistration(
		@Arg('registration_id', () => ID) registration_id: string
	): Promise<RegistrationResponse> {
		return this.registationService.toggleActivateRegistration(registration_id)
	}

	@Query(() => RegistrationsData)
	async exportData(): Promise<RegistrationsData> {
		return this.registationService.exportData()
	}
}
export default RegistrationResolver
