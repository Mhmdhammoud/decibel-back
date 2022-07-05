import {AddImageGalleryInput} from '../inputs'
import fs from 'fs'
import path from 'path'
import {Logger} from '../lib'
import {GalleryResponse} from '../responses/gallery.responses'
import {ErrorConstants} from '../constants'
import {Gallery} from '../schema'

class GalleryService {
	fileDir = path.join(__dirname, '../constants/gallery.json')

	async addImg(input: AddImageGalleryInput): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fs.readFile(this.fileDir,
				{encoding: 'utf8', flag: 'r'},
				(err, data) => {
					if (err) {
						Logger.error('GalleryService', 'addImg', err.message, 'localhost', err)
						return reject(false)
					} else {
						const oldData = JSON.parse(data)
						const newObject = {img: input.img, alt: input.alt}
						oldData.push(newObject)
						return fs.writeFile(this.fileDir, JSON.stringify(oldData), {
							encoding: 'utf8',
							flag: 'w',
							//@ts-ignore
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
						}, (err, _) => {
							if (err) {
								Logger.error('GalleryService', 'addImg', err.message, 'localhost', err)
								return reject(false)
							} else {
								return resolve(true)
							}
						})
					}
				})
		})
	}

	async getAllImgs(): Promise<GalleryResponse> {
		return new Promise((resolve, reject) => {
			fs.readFile(this.fileDir,
				{encoding: 'utf8', flag: 'r'},
				(err, data) => {
					if (err) {
						Logger.error('GalleryService', 'addImg', err.message, 'localhost', err)
						return reject({
							errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
							gallery: [],
						})
					} else {
						const oldData = JSON.parse(data) as Gallery[]
						return resolve({
							errors: [],
							gallery: oldData,
						})
					}
				})
		})
	}

	async deleteImg(input: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fs.readFile(this.fileDir,
				{encoding: 'utf8', flag: 'r'},
				(err, data) => {
					if (err) {
						Logger.error('GalleryService', 'addImg', err.message, 'localhost', err)
						return reject(false)
					} else {
						const oldData = JSON.parse(data)
						const filteredData = oldData.filter((item: Gallery) => {
							return item.src !== input
						})
						return fs.writeFile(this.fileDir, JSON.stringify(filteredData), {
							encoding: 'utf8',
							flag: 'w',
							//@ts-ignore
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
						}, (err, _) => {
							if (err) {
								Logger.error('GalleryService', 'addImg', err.message, 'localhost', err)
								return reject(false)
							} else {
								return resolve(true)
							}
						})
					}
				})
		})
	}
}

export default GalleryService
