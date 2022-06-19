import {Resolver, Mutation, Query} from 'type-graphql'

@Resolver()
class RegistrationResolver {
	@Mutation(() => Boolean)
	async addRegisteration() {
		return true
	}
	@Query(() => Boolean)
	async exportData() {
		return true
	}
}
export default RegistrationResolver
