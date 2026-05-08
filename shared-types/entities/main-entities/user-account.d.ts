import { AccountBase } from "./account-base";
import { Leader } from "./leader";
import { Member } from "./member";

export interface UserAccount extends AccountBase {
    username: string;
    name?: string;
    bio?: string;
    currentLeadership?: Leader;
    currentMembership?: Member;
    leaderships?: Leader[];
    memberships?: Member[]
}