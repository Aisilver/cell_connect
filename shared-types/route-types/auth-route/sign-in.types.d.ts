import { UserAccount } from "../../entities/main-entities/account"

export type SignInCredentials = {
    email: string,
    password: string
}

export type UserSignInResponse = {
    account: UserAccount,
    accessToken: string
}