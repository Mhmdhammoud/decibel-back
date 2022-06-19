import {Field, ObjectType} from "type-graphql";
import BasicResponse from "./FieldErrorResponse";

@ObjectType()
class BasicPaginationResponse extends BasicResponse {
    @Field(() => Boolean)
    hasMore: boolean
    @Field(() => Number)
    length: number
}

export default BasicPaginationResponse
