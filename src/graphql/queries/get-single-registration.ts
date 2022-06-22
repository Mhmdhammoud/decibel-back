export default `
query GetRegistrations($registrationId: ID!) {
  getRegistrations(registration_id: $registrationId) {
    errors {
      field
      message
    }
    registration {
      _id
      fname
      lname
      fullName
      phone
      registration_id
      email
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
