import {AuthChecker} from '.'
import {buildSchema} from 'type-graphql'
import {GraphQLSchema} from 'graphql'
import {AdminResolver, RegistrationResolver} from '../resolvers'

const createSchema = async (): Promise<GraphQLSchema> => {
	const resolvers = [RegistrationResolver, AdminResolver] as const

	return buildSchema({
		resolvers,
		authChecker: AuthChecker,
	})
}
export default createSchema
