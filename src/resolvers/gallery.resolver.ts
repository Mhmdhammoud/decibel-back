import {Arg, Authorized, ID, Mutation, Query, Resolver} from 'type-graphql'
import {AddImageGalleryInput} from '../inputs'
import {GalleryService} from '../services'
import {GalleryResponse} from '../responses/gallery.responses'

@Resolver()
class GalleryResolver {
	constructor(private readonly galleryService: GalleryService) {
		this.galleryService = new GalleryService()
	}

	@Authorized()
	@Mutation(() => Boolean)
	async addImage(
		@Arg('input', () => AddImageGalleryInput) input: AddImageGalleryInput,
	): Promise<boolean> {
		return this.galleryService.addImg(input)
	}

	@Authorized()
	@Mutation(() => Boolean)
	async deleteImg(
		@Arg('input', () => ID) input: string,
	): Promise<boolean> {
		return this.galleryService.deleteImg(input)
	}

	@Query(() => GalleryResponse)
	async getAllImgs(): Promise<GalleryResponse> {
		return this.galleryService.getAllImgs()
	}
}

export default GalleryResolver
