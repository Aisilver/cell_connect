import { AccountBase } from "./account-base";
import { Leader } from "./leader";
import { Member } from "./member";

export interface UserAccount extends AccountBase {
    name?: string;
    username: string;
    bio?: string;
    leadership?: Leader | null;
    membership?: Member[]
}