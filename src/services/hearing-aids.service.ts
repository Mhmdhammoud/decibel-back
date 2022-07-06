import {AllHearingAidsResponse} from '../responses'
import {HearingAidModel} from '../schema'

class HearingAidsService {
	async getAllHearingAids(): Promise<AllHearingAidsResponse> {
		return {
			errors: [],
			hearingAids: await HearingAidModel.find({}),
		}
	}
}
export default HearingAidsService
