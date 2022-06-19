import {AuthChecker} from '.'
import {buildSchema} from 'type-graphql'
import {GraphQLSchema} from 'graphql'
import {RegistrationResolver} from '../resolvers'

const createSchema = async (): Promise<GraphQLSchema> => {
	const resolvers = [RegistrationResolver] as const

	return buildSchema({
		resolvers,
		authChecker: AuthChecker,
	})
}
export default createSchema
