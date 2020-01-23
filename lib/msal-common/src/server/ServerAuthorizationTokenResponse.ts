/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ServerError } from "../error/ServerError";

/**
 * Deserialized response object from server authorization code request.
 * - token_type: Indicates the token type value. The only type that Azure AD supports is Bearer.
 * - scope: The scopes that the access_token is valid for.
 * - expires_in: How long the access token is valid (in seconds).
 * - ext_expires_in: How long the access token is valid (in seconds) if the server isn't responding.
 * - access_token: The requested access token. The app can use this token to authenticate to the secured resource, such as a web API.
 * - refresh_token: An OAuth 2.0 refresh token. The app can use this token acquire additional access tokens after the current access token expires.
 * - id_token: A JSON Web Token (JWT). The app can decode the segments of this token to request information about the user who signed in.
 * 
 * In case of error:
 * - error: An error code string that can be used to classify types of errors that occur, and can be used to react to errors.
 * - error_description: A specific error message that can help a developer identify the root cause of an authentication error.
 * - error_codes: A list of STS-specific error codes that can help in diagnostics.
 * - timestamp: The time at which the error occurred.
 * - trace_id: A unique identifier for the request that can help in diagnostics.
 * - correlation_id: A unique identifier for the request that can help in diagnostics across components.
 */
export type ServerAuthorizationTokenResponse = {
    // Success
    token_type?: string;
    scope?: string;
    expires_in?: number;
    ext_expires_in?: number;
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
    // Error
    error?: string;
    error_description?: string;
    error_codes?: Array<string>;
    timestamp?: string;
    trace_id?: string;
    correlation_id?: string;
};

/**
 * Function which validates server authorization token response.
 * @param serverResponse 
 */
export function validateServerAuthorizationTokenResponse(serverResponse: ServerAuthorizationTokenResponse): void {
    // Check for error
    if (serverResponse.error || serverResponse.error_description) {
        const errString = `${serverResponse.error_codes} - [${serverResponse.timestamp}]: ${serverResponse.error_description} - Correlation ID: ${serverResponse.correlation_id} - Trace ID: ${serverResponse.trace_id}`;
        throw new ServerError(serverResponse.error, errString);
    }
}
