import { AccountBase } from "./account-base";
import { Leader } from "./leader";
import { Member } from "./member";
import { AccountSuspension } from "./suspension";

export interface UserAccount extends AccountBase {
    username: string;
    name?: string;
    bio?: string;
    suspension?: AccountSuspension;
    suspensions?: AccountSuspension[];
    currentLeadership?: Leader;
    currentMembership?: Member;
    leaderships?: Leader[];
    memberships?: Member[]
}