import {AuthChecker} from 'type-graphql'
import {IContext} from '../types'

const authChecker: AuthChecker<IContext> = ({context}) => {
	return !!context.user
}
export default authChecker
