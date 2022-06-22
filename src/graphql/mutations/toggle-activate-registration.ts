export default`
mutation ToggleActivateRegistration($registrationId: ID!) {
  toggleActivateRegistration(registration_id: $registrationId) {
    errors {
      field
      message
    }
    registration {
      _id
      company_type
      country_of_residence
      createdAt
      date_of_birth
      email
      fname
      lname
      fullName
      nationality
      phone
      registrant_type
      status
    }
  }
}
`
