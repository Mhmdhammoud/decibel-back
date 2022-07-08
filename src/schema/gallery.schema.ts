import {
	getModelForClass,
	index,
	prop,
	queryMethod,
	ReturnModelType,
} from '@typegoose/typegoose'
import {Alphabets} from '../types'
import {idGenerator} from '../utils'
import {Field, ID, ObjectType} from 'type-graphql'
import {AsQueryMethod} from '@typegoose/typegoose/lib/types'

function findByGalleryId(
	this: ReturnModelType<typeof Gallery, QueryHelpers>,
	gallery_id: Gallery['gallery_id']
) {
	return this.findOne({gallery_id})
}
interface QueryHelpers {
	findByGalleryId: AsQueryMethod<typeof findByGalleryId>
}
@queryMethod(findByGalleryId)
@index({gallery_id: 1})
@ObjectType()
export class Gallery {
	@Field(() => ID, {nullable: true})
	_id: string

	@Field(() => String, {nullable: true})
	@prop()
	src: string

	@Field(() => String, {nullable: true})
	@prop()
	alt: string

	@Field(() => String, {nullable: true})
	@prop()
	link: string

	@Field(() => String)
	@prop({
		required: true,
		default: () => `gallery_${idGenerator(Alphabets.ALPHANUMERIC, 4)}`,
		unique: true,
	})
	gallery_id: string

	@Field(() => Date)
	createdAt: Date

	@Field(() => Date)
	updatedAt: Date
}

export default getModelForClass<typeof Gallery, QueryHelpers>(Gallery, {
	schemaOptions: {
		versionKey: false,
		timestamps: true,
		minimize: false,
	},
})
