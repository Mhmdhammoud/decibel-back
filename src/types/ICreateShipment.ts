export type GatewayConfirmation =
	| 'none'
	| 'delivery'
	| 'signature'
	| 'adult_signature'
	| 'direct_signature'
	| 'direct_signature'
export interface GatewayWeight {
	value?: number
	units: 'pounds' | 'ounces' | 'grams'
	WeightUnits?: number
}
export interface GatewayDimensions {
	length?: number
	width?: number
	height?: number
	units: 'inches' | 'centimeters'
}
export type GatewayAddressVerified =
	| 'Address not yet validated'
	| 'Address validated successfully'
	| 'Address validation warning'
	| 'Address validation failed'
export interface GatewayShipFrom {
	name: string
	company: string
	street1: string
	street2: string
	street3: string | null
	city: string
	state: string
	postalCode: string
	country: string
	phone: string
	residential: boolean
	addressVerified: GatewayAddressVerified
}
export interface GatewayShipTo {
	name: string
	company: string
	street1: string
	street2: string
	street3: string | null
	city: string
	state: string
	postalCode: string
	country: string
	phone: string
	residential: boolean
	addressVerified: GatewayAddressVerified
}
export interface IShipment {
	carrierCode: string
	serviceCode: string
	packageCode: string | null
	confirmation?: GatewayConfirmation
	shipDate: Date
	weight: GatewayWeight
	dimensions: GatewayDimensions
	shipFrom: GatewayShipFrom
	shipTo: GatewayShipTo
	fromPostalCode: string
	insuranceOptions: null
	internationalOptions: null
	advancedOptions: null
	testLabel: boolean
}
