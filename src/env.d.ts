declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number
		NODE_ENV: 'development' | 'production' | 'test'
		MONGO_URI: string
		PRIVATE_KEY: string
		PUBLIC_KEY: string
		AWS_ACCESS_KEY_ID: string
		AWS_SECRET_ACCESS_KEY: string
		BUCKET_NAME: string
		BUCKET_REGION: string
		EMAIL_USER: string
		EMAIL_PASSWORD: string
		EMAIL_DOMAIN: string
		EMAIL_HOST: string
		EMAIL_PORT: number
		FORGET_PASSWORD_PREFIX: string
		TEST_MONGO_URI: string
	}
}
