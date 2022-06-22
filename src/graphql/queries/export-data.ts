export default `
query ExportData {
  exportData {
    errors {
      field
      message
    }
    link
  }
}
`
