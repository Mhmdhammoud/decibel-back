import {AuthResponse} from '../common'
import {AdminModel} from '../schema'
import * as bcrypt from 'bcryptjs'
import {signJwt} from '../utils'
import {AdminResponse} from '../responses'
import {LoginInput} from '../inputs'
import {ErrorConstants} from '../constants'
class AdminService {
	async login(input: LoginInput): Promise<AuthResponse> {
		const user = await AdminModel.find().findByEmail(input.email).lean()
		if (!user) {
			return {
				errors: [
					{
						field: 'email',
						message: 'Wrong credentials',
					},
					{
						field: 'email',
						message: 'Wrong email or password.',
					},
				],
				token: null,
			}
		}
		const isPasswordMatch = await bcrypt.compare(input.password, user.password)
		const {password: dbPassword, ...rest} = user
		if (!isPasswordMatch) {
			return {
				errors: [
					{
						field: 'email',
						message: 'Wrong credentials',
					},
					{
						field: 'email',
						message: 'Wrong email or password.',
					},
				],
				token: null,
			}
		}
		return {
			errors: [],
			token: signJwt(rest),
		}
	}
	async getAdmin(userId: string): Promise<AdminResponse> {
		return {
			errors: [],
			admin: await AdminModel.find().findByAdminId(userId).lean(),
		}
	}
	async createAdmin(input: LoginInput): Promise<AuthResponse> {
		const {email} = input
		const _verifyEmail = await AdminModel.find().findByEmail(email)
		if (_verifyEmail) {
			return {
				errors: [
					{
						field: 'email',
						message: 'Email already in use.',
					},
				],
				token: null,
			}
		}

		const newAdmin = await AdminModel.create(input)
		if (!newAdmin) {
			return {
				errors: [ErrorConstants['INTERNAL_SERVER_ERROR']],
				token: null,
			}
		}
		const {password: dbPassword, ...rest} = newAdmin
		return {
			errors: [],
			token: signJwt(rest),
		}
	}
}
export default AdminService
