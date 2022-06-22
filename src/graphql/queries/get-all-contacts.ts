export default`
query GetAllContacts($sorting: Sorting!) {
  getAllContacts(sorting: $sorting) {
    errors {
      field
      message
    }
    contacts {
      _id
      fname
      lname
      fullName
      phone
      email
      message
      contact_id
      createdAt
      updatedAt
    }
  }
}
`
