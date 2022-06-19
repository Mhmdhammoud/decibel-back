import {Request, Response} from 'express'

interface IRequest extends Request {
	headers: {
		'x-real-ip': string
		'x-forwarded-for': string
		host: string
		authorization: string
	}
}

export interface IContext {
	req: IRequest
	res: Response
	user: {} | null
}
