import {AuthChecker} from '.'
import {buildSchema} from 'type-graphql'
import {GraphQLSchema} from 'graphql'
import {
	AdminResolver,
	ContactsResolver, GalleryResolver,
	RegistrationResolver,
} from '../resolvers'

const createSchema = async (): Promise<GraphQLSchema> => {
	const resolvers = [
		RegistrationResolver,
		AdminResolver,
		ContactsResolver,
		GalleryResolver,
	] as const

	return buildSchema({
		resolvers,
		authChecker: AuthChecker,
	})
}
export default createSchema
