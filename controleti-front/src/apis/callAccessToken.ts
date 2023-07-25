import { loginRequest } from "../auth/authConfig";
import { msalInstance } from "../index";

export async function callEndpointAccessToken(accessToken?: any): Promise<string> {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }
    
        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });
        accessToken = response.accessToken;
    }

    return `Bearer ${accessToken}`;
}