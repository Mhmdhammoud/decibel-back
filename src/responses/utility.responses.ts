import {Field, ObjectType} from 'type-graphql'
import BasicResponse from '../common/FieldErrorResponse'

@ObjectType()
export class UploadResponse extends BasicResponse {
	@Field(() => String, {nullable: true})
	file?: string | null
}
