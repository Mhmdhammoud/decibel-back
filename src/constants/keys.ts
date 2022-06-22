import moment from 'moment'

export const AUTHORIZATION_KEY = 'Bearer '
export const DATE_FORMAT = 'MM-DD-YYYY'
export const DATE_TIME_FORMAT = 'MM-DD-YYYY HH:MM'
export const DATA_FILE_NAMING = `Registrations-${moment().format(DATE_FORMAT)}`
