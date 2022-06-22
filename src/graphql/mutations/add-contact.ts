export default`
mutation AddContact($input: ContactInput!) {
  addContact(input: $input) {
    errors {
      field
      message
    }
    success
  }
}`
