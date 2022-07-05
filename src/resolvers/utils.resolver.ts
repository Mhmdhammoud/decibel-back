import {GraphQLUpload} from 'graphql-upload'
import {Arg, Authorized, Mutation, Resolver} from 'type-graphql'
import {UtilsService} from '../services'
import {IUpload} from '../types'
import {UploadResponse} from '../responses'


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
