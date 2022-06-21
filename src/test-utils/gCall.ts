import {graphql, GraphQLSchema} from 'graphql'
import {Maybe} from 'type-graphql'

import {createSchema, verifyJwt} from '../utils'

interface Options {
	source: string
	variableValues?: Maybe<{
		[key: string]: any
	}>
	token?: string
}

let schema: GraphQLSchema

 export default async ({source, variableValues, token}: Options) => {
	if (!schema) {
		schema = await createSchema()
	}
	return graphql({
		schema,
		source,
		variableValues,
		contextValue: {
			admin: token ? await verifyJwt(token) : null,
		},
	})
}
