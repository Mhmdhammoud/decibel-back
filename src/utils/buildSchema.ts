import {AuthChecker} from '.'
import {buildSchema} from 'type-graphql'
import {GraphQLSchema} from 'graphql'
import {
	AdminResolver,
	CleaningResolver,
	ContactsResolver,
	GalleryResolver,
	HearingAidsResolver,
	RegistrationResolver,
	UtilitiesResolver,
} from '../resolvers'

const createSchema = async (): Promise<GraphQLSchema> => {
	const resolvers = [
		RegistrationResolver,
		AdminResolver,
		ContactsResolver,
		GalleryResolver,
		UtilitiesResolver,
		HearingAidsResolver,
		CleaningResolver,
	] as const

	return buildSchema({
		resolvers,
		authChecker: AuthChecker,
	})
}
export default createSchema
