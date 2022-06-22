export default `
mutation Login($input: LoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    token
  }
}
`
