import {BasicError} from '../common'
import {Field, ObjectType} from 'type-graphql'
import {HearingAid} from '../schema'

@ObjectType()
export class AllHearingAidsResponse extends BasicError {
	@Field(() => [HearingAid], {nullable: true})
	hearingAids: HearingAid[]
}
