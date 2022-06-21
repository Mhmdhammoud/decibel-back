const ErrorConstants = {
	INTERNAL_SERVER_ERROR: {
		field: 'Internal Server Error',
		message: 'Something went wrong, please contact system administrator.',
	},
	REGISTRATION_NOT_FOUND: {
		field: 'registration_id',
		message: 'registration not found',
	},
	ADMIN_NOT_FOUND: {
		field: 'email',
		message: 'email already exists',
	},
}
export default ErrorConstants
