import {Field, InputType} from 'type-graphql'

@InputType()
export class AddImageGalleryInput {
	@Field(() => String, {nullable: true})
	src: string

	@Field(() => String, {nullable: true})
	alt: string

	@Field(() => String, {nullable: true})
	link: string
}
