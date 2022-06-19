import {AuthChecker} from 'type-graphql'
import {IContext, UserRole} from '../types'

const authChecker: AuthChecker<IContext> = ({context}, roles) => {
    if (!context.user) {
        return false
    }
    if (roles.length === 0) {
        return true
    }
    if (
        context.user.role === UserRole.NORMAL &&
        roles.includes('NORMAL')
    ) {
        return true
    }
    return context.user.role === UserRole.ADMIN && roles.includes('ADMIN')
}
export default authChecker
