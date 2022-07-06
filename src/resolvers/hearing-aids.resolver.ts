import {Authorized, Query, Resolver} from 'type-graphql'
import {AllHearingAidsResponse} from '../responses'
import {HearingAid} from '../schema'
import {HearingAidsService} from '../services'

@Resolver(HearingAid)
class HearingAidsResolver {
	constructor(private readonly hearingAidsService: HearingAidsService) {
		this.hearingAidsService = new HearingAidsService()
	}

	@Authorized()
	@Query(() => AllHearingAidsResponse)
	async getAllHearingAids(): Promise<AllHearingAidsResponse> {
		return this.hearingAidsService.getAllHearingAids()
	}
}

export default HearingAidsResolver
