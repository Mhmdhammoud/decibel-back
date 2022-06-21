import {
	getModelForClass,
	index,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import {IsEmail} from 'class-validator'
import {Field, ID, ObjectType, registerEnumType} from 'type-graphql'
import {Alphabets, RegistrantType, Sorting} from '../types'
import {idGenerator} from '../utils'

function findByRegistrationId(
	this: ReturnModelType<typeof Registration, QueryHelpers>,
	registration_id: Registration['registration_id']
) {
	return this.findOne({registration_id})
}

function findByEmail(
	this: ReturnModelType<typeof Registration, QueryHelpers>,
	email: Registration['email']
) {
	return this.findOne({email})
}

interface QueryHelpers {
	findByEmail: AsQueryMethod<typeof findByEmail>
	findByRegistrationId: AsQueryMethod<typeof findByRegistrationId>
}

registerEnumType(Sorting, {
	name: 'Sorting',
})

registerEnumType(RegistrantType, {
	name: 'RegistrantType',
})

@queryMethod(findByEmail)
@queryMethod(findByRegistrationId)
@index({user_id: 1})
@ObjectType()
export class Registration {
	@Field(() => ID)
	_id: string

	@Field(() => String)
	@prop({trim: true})
	fname: string

	@Field(() => String)
	@prop({trim: true})
	lname: string

	@Field(() => String)
	@IsEmail()
	@prop({
		unique: true,
		lowercase: true,
		trim: true,
	})
	email: string

	@Field(() => String)
	@prop({
		required: true,
		default: () => `registration_${idGenerator(Alphabets.ALPHANUMERIC, 4)}`,
		unique: true,
	})
	registration_id: string

	@Field(() => String)
	public get fullName() {
		return `${this.fname} ${this.lname}`
	}

	@Field(() => String)
	@prop()
	phone: string

	@Field(() => Date)
	@prop({type: Date})
	date_of_birth: Date

	@Field(() => String)
	@prop()
	nationality: String

	@Field(() => String)
	@prop()
	country_of_residence: String

	@Field(() => RegistrantType)
	@prop({type: String})
	registrant_type: RegistrantType

	@Field(() => String, {nullable: true})
	@prop()
	university: string

	@Field(() => String, {nullable: true})
	@prop()
	company_type: string

	@Field(() => Boolean)
	@prop({default: false})
	status: boolean

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}

export default getModelForClass<typeof Registration, QueryHelpers>(
	Registration,
	{
		schemaOptions: {
			versionKey: false,
			timestamps: true,
			minimize: false,
		},
	}
)
