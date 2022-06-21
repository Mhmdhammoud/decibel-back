class LocalFieldError {
	field: string
	message: string
}
class UploadResponse {
	errors?: LocalFieldError[]

	file?: string | null
}
export default UploadResponse
