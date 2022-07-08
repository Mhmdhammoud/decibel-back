import {
	getModelForClass,
	index,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import {IsEmail} from 'class-validator'
import {Field, ObjectType} from 'type-graphql'
import {Alphabets} from '../types'
import {idGenerator} from '../utils'
import {AbstractSchema} from './abstract.schema'

function findByContactId(
	this: ReturnModelType<typeof Contact, QueryHelpers>,
	contact_id: Contact['contact_id']
) {
	return this.findOne({contact_id})
}

interface QueryHelpers {
	findByContactId: AsQueryMethod<typeof findByContactId>
}

@queryMethod(findByContactId)
@index({contact_id: 1})
@ObjectType()
export class Contact extends AbstractSchema {
	@Field(() => String)
	@prop({trim: true})
	fname: string

	@Field(() => String)
	@prop({trim: true})
	lname: string

	@Field(() => String)
	public get fullName() {
		return `${this.fname} ${this.lname}`
	}

	@Field(() => String)
	@prop()
	phone: string

	@Field(() => String)
	@IsEmail()
	@prop({
		lowercase: true,
		trim: true,
	})
	email: string

	@Field(() => String)
	@prop()
	message: string

	@Field(() => String)
	@prop({
		required: true,
		default: () => `contact_${idGenerator(Alphabets.ALPHANUMERIC, 4)}`,
		unique: true,
	})
	contact_id: string
}

export default getModelForClass<typeof Contact, QueryHelpers>(Contact, {
	schemaOptions: {
		versionKey: false,
		timestamps: true,
		minimize: false,
	},
})
