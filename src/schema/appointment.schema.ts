import {
	getModelForClass,
	index,
	modelOptions,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'
import {Field, ObjectType} from 'type-graphql'
import {Alphabets} from '../types'
import {idGenerator} from '../utils'
import {AbstractSchema} from './abstract.schema'

function findByAppointmentId(
	this: ReturnModelType<typeof Appointment, QueryHelpers>,
	appointment_id: Appointment['appointment_id']
) {
	return this.findOne({appointment_id})
}

interface QueryHelpers {
	findByAppointmentId: AsQueryMethod<typeof findByAppointmentId>
}

@modelOptions({
	schemaOptions: {
		versionKey: false,
		minimize: false,
		toJSON: {getters: true, virtuals: true},
		toObject: {getters: true, virtuals: true},
		timestamps: true,
	},
})
@ObjectType()
export class Patient extends AbstractSchema {
	@Field(() => String)
	@prop()
	first_name: string

	@Field(() => String)
	@prop()
	last_name: string

	@Field(() => String)
	@prop()
	middle_name: string

	@Field(() => String)
	public get fullName() {
		return `${this.first_name} ${this.middle_name} ${this.last_name}`
	}

	@Field(() => String)
	@prop()
	phone: string

	@Field(() => String)
	@prop()
	email: string

	@Field(() => String)
	@prop()
	dob: string
}

@queryMethod(findByAppointmentId)
@index({appointment_id: 1})
@ObjectType()
export class Appointment extends AbstractSchema {
	@Field(() => Patient)
	@prop({type: Patient})
	patient: Patient

	@Field(() => Date)
	@prop()
	start_date: Date

	@Field(() => Date)
	@prop()
	end_date: Date

	@Field(() => String)
	@prop({
		required: true,
		default: () => `appointment_${idGenerator(Alphabets.ALPHANUMERIC, 4)}`,
		unique: true,
	})
	appointment_id: string
}

export default getModelForClass<typeof Appointment, QueryHelpers>(Appointment, {
	schemaOptions: {
		versionKey: false,
		timestamps: true,
		minimize: false,
	},
})
