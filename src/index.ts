import 'reflect-metadata'
import {ApolloServer} from 'apollo-server-express'
import express from 'express'
import dotenv from 'dotenv'
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'
// import {IContext} from './types'
import {ConnectDb, Logger} from './lib'
import {createSchema, verifyJwt} from './utils'
import {graphqlUploadExpress} from 'graphql-upload'
// import {User} from './users'
import {existsSync, mkdir} from 'fs'
;(async function () {
	const app = express()
	dotenv.config()
	await ConnectDb()
	if (!existsSync('logs')) {
		mkdir('logs', (err) =>
			Logger.error(
				'index level',
				'bootstrap',
				err?.message as string,
				'localhost',
				err as Object
			)
		)
	}
	const schema = await createSchema()
	const server = new ApolloServer({
		schema,
		// context: (ctx: IContext) => {
		//     const context = ctx
		//     const fullToken = ctx.req.headers['authorization']
		//     if (fullToken) {
		//         const token = fullToken.slice(7, fullToken.length).trimLeft()
		//         context.user = verifyJwt<User>(token)
		//     }
		//     return context
		// }
		context: (ctx) => ctx,
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	})
	//40 Megabytes
	app.use(graphqlUploadExpress({maxFileSize: 41943040}))
	await server.start()
	server.applyMiddleware({app})
	app.listen(process.env.PORT, () => {
		Logger.info(
			'Index level',
			'bootstrap',
			`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`,
			'localhost'
		)
	})
})().catch((e) => {
	console.error(e)
	process.exit(1)
})
