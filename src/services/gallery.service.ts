import mongoose from 'mongoose'
import {AddImageGalleryInput} from '../inputs'
import {GalleryResponse} from '../responses/gallery.responses'
import {GalleryModel} from '../schema'

class GalleryService {
	async addImg(input: AddImageGalleryInput): Promise<boolean> {
		const createdImage = await GalleryModel.create(input)
		return !!createdImage
	}

	async getAllImgs(): Promise<GalleryResponse> {
		const allImages = await GalleryModel.find({}).sort({createdAt: -1})
		return {
			errors: [],
			gallery: allImages,
		}
	}

	async deleteImg(input: string): Promise<boolean> {
		if (!mongoose.isValidObjectId(input)) {
			return false
		}
		await GalleryModel.findByIdAndDelete(input)
		return true
	}
}

export default GalleryService
