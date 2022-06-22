export default`
query GetAllRegistrations($sorting: Sorting!) {
  getAllRegistrations(sorting: $sorting) {
    errors {
      field
      message
    }
    registrations {
      _id
      fname
      lname
      email
      registration_id
      fullName
      phone
      date_of_birth
      nationality
      country_of_residence
      university
      registrant_type
      company_type
      status
      createdAt
      updatedAt
    }
    link
  }
}
	`
