export default `
mutation AddRegistration($input:  RegistrationInput!) {
  addRegisteration(input: $input) {
    errors {
      field
      message
    }
    registration {
      fullName
      _id
      fname
      lname
      email
      registration_id
      phone
      date_of_birth
      nationality
      country_of_residence
      registrant_type
      university
      company_type
      status
      createdAt
      updatedAt
    }
  }
}
`
