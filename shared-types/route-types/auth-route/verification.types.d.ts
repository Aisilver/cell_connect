export type EmailVerificationRequest = {
    email: string
}

export type InUseResponse = {
    inUse: boolean
}

export type EmailOTPVerificationResponse = {
    valid: boolean
}

export type UsernameVerificationRequest = {
    username: string
}

export type PhoneNumberVerficationRequest = {
    phoneNumber: string
}