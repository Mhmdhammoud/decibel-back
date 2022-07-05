import {GraphQLUpload} from 'graphql-upload'
import {
	Arg,
	Authorized,
	Field,
	Mutation,
	ObjectType,
	Resolver,
} from 'type-graphql'
import {UtilsService} from '../services'
import {IUpload} from '../types'
import FieldErrorResponse from '../common/FieldErrorResponse'

@ObjectType()
export class UploadResponse {
	@Field(() => [FieldErrorResponse], {nullable: true})
	errors?: FieldErrorResponse[]

	@Field(() => String, {nullable: true})
	file?: string | null
}

@Resolver()
class UtilsResolver {
	constructor(private readonly utilsService: UtilsService) {
		this.utilsService = new UtilsService()
	}

	@Authorized()
	@Mutation(() => UploadResponse)
	async uploadFile(
		@Arg('file', () => GraphQLUpload) file: IUpload,
	): Promise<UploadResponse> {
		return this.utilsService.uploadFile(file)
	}
}

export default UtilsResolver
