import {Logger, S3Client} from '../lib'
import {readFile} from 'fs'
import {UploadResponse} from '../common'
import {S3 as AmazonS3} from 'aws-sdk'

class UtilitiesService {
	async uploadLocalFile(
		localDir: string,
		bucketDir: string
	): Promise<UploadResponse> {
		return new Promise((resolve, reject) => {
			readFile(localDir, async (err, data) => {
				if (err) {
					Logger.error('utilitiesService','uploadLocalFile',err.message,'localhost',err)
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
}
export default UtilitiesService
