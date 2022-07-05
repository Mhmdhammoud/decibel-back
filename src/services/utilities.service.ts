import {createWriteStream, readFile} from 'fs'
import {IUpload} from '../types'
import {S3 as AmazonS3} from 'aws-sdk'
import {Logger, S3Client} from '../lib'
import {UploadResponse} from '../responses'

class UtilsService {
	async uploadLocalFile(
		localDir: string,
		bucketDir: string,
	): Promise<UploadResponse> {
		return new Promise((resolve, reject) => {
			readFile(localDir, async (err, data) => {
				if (err) {
					Logger.error('utilitiesService', 'uploadLocalFile', err.message, 'localhost', err)
					return reject({
						errors: [
							{
								field: 'file',
								message: 'Something went wrong while uploading',
							},
						],
						file: '',
					})
				}

				const body = Buffer.from(data)
				const params: AmazonS3.PutObjectRequest = {
					Bucket: process.env.BUCKET_NAME as string,
					Key: `${bucketDir}`,
					Body: body,
					ContentType: 'application/octet-stream',
					ContentEncoding: 'base64',
				}

				await S3Client.upload(params, (err) => {
					if (err) {
						Logger.error('utilitiesService', 'uploadFile', err.message, 'localhost', err)
						return reject({
							errors: [
								{
									field: 'file',
									message: err.message,
								},
							],
							file: '',
						})
					}
				}).promise()
				const {protocol} = S3Client.endpoint
				return resolve({
					errors: [],
					file: `${protocol}//${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${bucketDir}`,
				})
			})
		})
	}

	async uploadFile(file: IUpload): Promise<UploadResponse> {
		const {filename, createReadStream, encoding, mimetype} = file
		const bucketDir = `youssef/assets/${filename}`
		const localDir = `./assets/images/${filename}`
		return new Promise(async (resolve, reject) => {
			createReadStream()
				.pipe(
					createWriteStream(localDir).on('finish', () => {
						readFile(localDir, async (err, data) => {
							if (err) {
								Logger.error('utilitiesService', 'uploadFile', err.message, 'localhost', err)
								return reject({
									errors: [
										{
											field: 'file',
											message: 'Something went wrong while uploading',
										},
									],
									file: '',
								})
							}
							const body = Buffer.from(data)
							const params: AmazonS3.PutObjectRequest = {
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								Bucket: process.env.BUCKET_NAME!,
								Key: `${bucketDir}`,
								Body: body,
								ContentType: mimetype,
								ContentEncoding: encoding,
							}
							await S3Client.upload(params, (err) => {
								if (err) {
									Logger.error('utilitiesService', 'uploadFile', err.message, 'localhost', err)
									return reject({
										errors: [
											{
												field: 'file',
												message: err.message,
											},
										],
										file: '',
									})
								}
							}).promise()
							const {protocol} = S3Client.endpoint
							return resolve({
								errors: [],
								file: `${protocol}//${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${bucketDir}`,
							})
						})
					}),
				)
				.on('error', (err) => {
						Logger.error('utilitiesService', 'uploadFile', err.message, 'localhost', err)
						reject({
							errors: [
								{
									field: 'file',
									message: 'Something went wrong while uploading',
								},
							],
							file: '',
						})
					},
				)
		})
	}
}

export default UtilsService
