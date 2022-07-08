import {
	getModelForClass,
	index,
	pre,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import * as bcrypt from 'bcryptjs'
import {IsEmail} from 'class-validator'
import {Field, ObjectType} from 'type-graphql'
import {Alphabets} from '../types'
import {idGenerator} from '../utils'
import {AbstractSchema} from './abstract.schema'

function findByAdminId(
	this: ReturnModelType<typeof Admin, QueryHelpers>,
	admin_id: Admin['admin_id']
) {
	return this.findOne({admin_id})
}

function findByEmail(
	this: ReturnModelType<typeof Admin, QueryHelpers>,
	email: Admin['email']
) {
	return this.findOne({email})
}

interface QueryHelpers {
	findByEmail: AsQueryMethod<typeof findByEmail>
	findByAdminId: AsQueryMethod<typeof findByAdminId>
}

@pre<Admin>('save', async function (next) {
	if (!this.isModified('password')) {
		return
	}
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})
@queryMethod(findByEmail)
@queryMethod(findByAdminId)
@index({admin_id: 1})
@ObjectType()
export class Admin extends AbstractSchema {
	@Field(() => String)
	@IsEmail()
	@prop({
		unique: true,
		lowercase: true,
		trim: true,
	})
	email: string

	@prop()
	password: string

	@Field(() => String)
	@prop({
		required: true,
		default: () => `admin_${idGenerator(Alphabets.ALPHANUMERIC, 4)}`,
		unique: true,
	})
	admin_id: string
}

export default getModelForClass<typeof Admin, QueryHelpers>(Admin, {
	schemaOptions: {
		versionKey: false,
		timestamps: true,
		minimize: false,
	},
})
