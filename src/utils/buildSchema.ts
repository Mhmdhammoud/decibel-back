import {AuthChecker} from '.'
import {buildSchema} from 'type-graphql'
import {GraphQLSchema} from 'graphql'
import {
	AdminResolver,
	ContactsResolver,
	RegistrationResolver,
} from '../resolvers'

const createSchema = async (): Promise<GraphQLSchema> => {
	const resolvers = [
		RegistrationResolver,
		AdminResolver,
		ContactsResolver,
	] as const

	return buildSchema({
		resolvers,
		authChecker: AuthChecker,
	})
}
export default createSchema
