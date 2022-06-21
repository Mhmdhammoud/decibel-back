import moment from 'moment'

export const AUTHORIZATION_KEY = 'Bearer '
export const DATE_FORMAT = 'DD-MM-YYYY'
export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:MM'
export const DATA_FILE_NAMING = `Registrations-${moment().format(DATE_FORMAT)}`
