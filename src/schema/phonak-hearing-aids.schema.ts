import {Field, ObjectType} from 'type-graphql'
import {
	getModelForClass,
	index,
	modelOptions,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import {idGenerator} from '../utils'
import {Alphabets} from '../types'
import {AbstractSchema} from './abstract.schema'

function findByTitle(
	this: ReturnModelType<typeof HearingAid, QueryHelpers>,
	title: HearingAid['title']
) {
	return this.findOne({title})
}

function findByHearingAidId(
	this: ReturnModelType<typeof HearingAid, QueryHelpers>,
	hearingAidId: HearingAid['hearingAidId']
) {
	return this.findOne({hearingAidId})
}

interface QueryHelpers {
	findByHearingAidId: AsQueryMethod<typeof findByHearingAidId>
	findByTitle: AsQueryMethod<typeof findByTitle>
}

@modelOptions({
	schemaOptions: {
		_id: false,
		timestamps: true,
		versionKey: false,
	},
})
@ObjectType()
export class HearingAidOption {
	@Field(() => String)
	@prop()
	title: string

	@Field(() => String)
	@prop()
	color: string

	@Field(() => String)
	@prop()
	image: string

	@Field(() => String, {nullable: true})
	@prop()
	code: string
}

@queryMethod(findByHearingAidId)
@queryMethod(findByTitle)
@index({hearingAidId: 1})
@index({title: 1})
@ObjectType()
export class HearingAid extends AbstractSchema {
	@Field(() => String)
	@prop()
	title: string

	@Field(() => String)
	@prop()
	code: string

	@Field(() => String)
	@prop()
	image: string

	@Field(() => [HearingAidOption], {nullable: true})
	@prop({type: [HearingAidOption]})
	options: HearingAidOption[]

	@Field(() => String)
	@prop({
		required: true,
		default: () => `hearing_aid${idGenerator(Alphabets.ALPHANUMERIC, 8)}`,
		unique: true,
	})
	hearingAidId: string
}

export default getModelForClass<typeof HearingAid, QueryHelpers>(HearingAid, {
	schemaOptions: {versionKey: false, timestamps: true, minimize: false},
})
