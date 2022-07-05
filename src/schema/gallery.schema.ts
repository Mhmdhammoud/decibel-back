import {Field, ObjectType} from 'type-graphql'

@ObjectType()
class Gallery {
	@Field(() => String, {nullable: true})
	src: string

	@Field(() => String, {nullable: true})
	alt: string
}

export default Gallery
