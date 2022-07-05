import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
class Gallery {
	@Field(() => ID, {nullable: true})
	id: string

	@Field(() => String, {nullable: true})
	src: string

	@Field(() => String, {nullable: true})
	alt: string
}

export default Gallery
