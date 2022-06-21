export default `
mutation CreateAdmin($input: LoginInput!) {
	createAdmin(input: $input) {
		errors {
			field
			message
	}
	token
	}
}
`
