import {BasicError} from '../common'
import {Field, ObjectType} from 'type-graphql'
import {Cleaning} from '../schema'

@ObjectType()
export class CleaningResponse extends BasicError {
	@Field(() => Cleaning, {nullable: true})
	cleaning: Cleaning | null
}
@ObjectType()
export class AllCleaningResponse extends BasicError {
	@Field(() => [Cleaning], {nullable: true})
	cleanings: Cleaning[] | null
}
