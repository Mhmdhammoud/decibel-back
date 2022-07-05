import {BasicError} from '../common'
import {Field, ObjectType} from 'type-graphql'
import {Gallery} from '../schema'


@ObjectType()
export class GalleryResponse extends BasicError {
	@Field(() => [Gallery], {nullable: true})
	gallery: Gallery[] | null
}
