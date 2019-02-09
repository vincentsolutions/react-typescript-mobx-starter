export interface IConfig {
    urls: {
        api: string;
    };
    apiConfig: {
        timeout: number;
    }
}

const config : IConfig = {
    urls: {
        api: process.env.baseApiUrl as string
    },
    apiConfig: {
        timeout: parseInt(process.env.apiTimeout as string)
    }
};

export default config;