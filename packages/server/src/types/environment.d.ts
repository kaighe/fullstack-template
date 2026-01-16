declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ACCESS_SECRET: string
            
            SERVER_PORT: string
        }
    }
}

export {}