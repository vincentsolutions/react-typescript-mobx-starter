import {AxiosError} from "axios";
import {ApiError} from "../data/models/Errors";

/** MARK: We ignore 422 status codes as these
 *  are usually used for validation errors and
 *  we want to send the error back to the view.
 */
const statusCodesToIngore = [
    422
];

class ErrorHandler {
    static handleApiError(error: AxiosError) {
        const errorResponse = error.response;

        if (errorResponse) {
            const apiErrors = errorResponse.data.errors as ApiError[];

            console.log(...apiErrors);

            if (!statusCodesToIngore.findIndex(x => x === errorResponse.status)) {
                // MARK: Handle these errors, probably want to display them to the user.
            }

            return apiErrors;
        }

        console.log(error.message);

        return [] as ApiError[];
    }
}

export default ErrorHandler;