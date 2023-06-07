declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NODE_ENV: string;
      MYSQL_HOST: string;
      MYSQL_PORT: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      MYSQL_DB: string;
      JWT_ACCESS_SECRET_KEY: string;
      JWT_RESTORE_SECRET_KEY: string;
    }
  }
}

export {};
