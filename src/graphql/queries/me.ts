export default `
query Me {
  me {
    errors {
      field
      message
    }
    admin {
      _id
      email
      admin_id
      createdAt
      updatedAt
    }
  }
}
`
