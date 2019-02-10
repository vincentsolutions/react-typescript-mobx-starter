const config = {
    api: {
        timeout: parseInt(process.env.apiTimeout as string),
        baseUrl: process.env.baseApiUrl as string
    }
};

export default config;