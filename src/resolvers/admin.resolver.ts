import {AuthResponse} from '../common'
import {IContext} from '../types'
import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import {AdminResponse} from '../responses'
import {AdminService} from '../services'
import {LoginInput} from '../inputs'
import {ErrorConstants} from '../constants'

@Resolver()
class AdminResolver {
	constructor(private readonly adminService: AdminService) {
		this.adminService = new AdminService()
	}
	@Mutation(() => AuthResponse)
	async login(
		@Arg('input', () => LoginInput) input: LoginInput
	): Promise<AuthResponse> {
		return this.adminService.login(input)
	}
	@Authorized()
	@Query(() => AdminResponse)
	async me(@Ctx() context: IContext): Promise<AdminResponse> {
		if (!context.admin) {
			return {
				errors: [ErrorConstants['ADMIN_NOT_FOUND']],
				admin: null,
			}
		}
		const admin_id = context.admin?.admin_id as string
		const _verifyAdmin = await this.adminService.getAdmin(admin_id)
		if (!_verifyAdmin) {
			return {
				errors: [
					{
						field: 'Admin',
						message: 'Admin not found',
					},
				],
				admin: null,
			}
		}
		return _verifyAdmin
	}
	@Mutation(() => AuthResponse)
	async createAdmin(
		@Arg('input', () => LoginInput) input: LoginInput
	): Promise<AuthResponse> {
		return this.adminService.createAdmin(input)
	}
}
export default AdminResolver
