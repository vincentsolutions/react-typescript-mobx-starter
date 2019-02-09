class ApiError extends Error {
    code: string;
    resourceIdentifier: string;
    fieldName: string;
    debugInfo: string;
}

export { ApiError };