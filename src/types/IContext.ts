import {Request, Response} from 'express'
import {User} from '../users'

interface IRequest extends Request {
    headers: {
        'x-real-ip': string
        'x-forwarded-for': string
        host: string
        authorization: string
    }
}

export interface IContext {
    req: IRequest;
    res: Response;
    user: User | null
}
