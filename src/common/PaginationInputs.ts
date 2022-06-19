import {Field, InputType, Int} from 'type-graphql'
import {Sorting} from '../types'

@InputType()
export class BasicPaginationInput {
	@Field(() => Int)
	page: number
	@Field(() => Int)
	limit: number
	@Field(() => Sorting)
	sort: Sorting
}
