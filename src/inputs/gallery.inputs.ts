import {Field, InputType} from 'type-graphql'

@InputType()
export class AddImageGalleryInput {
	@Field(() => String)
	img: string

	@Field(() => String)
	alt: string
}
