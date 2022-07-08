import {
	getModelForClass,
	index,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import {Field, ObjectType} from 'type-graphql'
import {Alphabets} from '../types'
import {idGenerator} from '../utils'
import {AbstractSchema} from './abstract.schema'

function findByCleaningId(
	this: ReturnModelType<typeof Cleaning, QueryHelpers>,
	cleaning_id: Cleaning['cleaning_id']
) {
	return this.findOne({cleaning_id})
}

interface QueryHelpers {
	findByCleaningId: AsQueryMethod<typeof findByCleaningId>
}

@queryMethod(findByCleaningId)
@index({cleaning_id: 1})
@ObjectType()
export class Cleaning extends AbstractSchema {
	@Field(() => String)
	@prop()
	title: string

	@Field(() => String)
	@prop()
	description: string

	@Field(() => String)
	@prop()
	image: string

	@Field(() => String)
	@prop({
		required: true,
		default: () => `cleaning_${idGenerator(Alphabets.ALPHANUMERIC, 4)}`,
		unique: true,
	})
	cleaning_id: string
}

export default getModelForClass<typeof Cleaning, QueryHelpers>(Cleaning, {
	schemaOptions: {
		versionKey: false,
		timestamps: true,
		minimize: false,
	},
})
