export type ResponseCodes = 
    "TOKEN_EXPIRED" | "INVALID_TOKEN" | "NO_TOKEN" | 
    
    "NO_CLIENT_ID" | "INVALID_CLIENT_ID" | "IMPOSTER-ALERT" | 

    "API_RESPONSE_DECRYPTION_FAILED";

export type ApiResponse<Response = any> = {
    status: "success" | "failed";
    code?: ResponseCodes;
    data: Response;
    message?: string;
    errMessage?: string
};