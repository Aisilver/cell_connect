import { UserAccount } from "../../entities"

export type UserCreationRequest = {
    account: UserAccount,
    accountImageRef?: string
}