import AWS from 'aws-sdk'
import * as dotenv from 'dotenv'

dotenv.config()
const bucket = process.env.BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_ID
const secretAccessKey = process.env.AWS_SECRET
const region = process.env.BUCKET_REGION
const client = () => {
	if (bucket && accessKeyId && secretAccessKey && region) {
		return new AWS.S3({
			accessKeyId,
			secretAccessKey,
			region,
		})
	} else {
		console.error(`Error: AWS environment variables were not found`)
		process.exit(1)
	}
}

export default client()
