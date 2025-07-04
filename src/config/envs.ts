import 'dotenv/config';
import * as joi from 'joi';

interface enviar {
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
}

const envSchema = joi.object({
  PORT: joi.number().default(3000),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_HOST: joi.string().required(),
  DATABASE_PORT: joi.number().required(),
  DATABASE_NAME: joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: enviar = {
  DATABASE_USERNAME: value.DATABASE_USERNAME,
  DATABASE_PASSWORD: value.DATABASE_PASSWORD,
  DATABASE_HOST: value.DATABASE_HOST,
  DATABASE_PORT: value.DATABASE_PORT,
  DATABASE_NAME: value.DATABASE_NAME,
};

export const envs = {
  PORT: value.PORT,
  DATABASE_USERNAME: envVars.DATABASE_USERNAME,
  DATABASE_PASSWORD: envVars.DATABASE_PASSWORD,
  DATABASE_HOST: envVars.DATABASE_HOST,
  DATABASE_PORT: envVars.DATABASE_PORT,
  DATABASE_NAME: envVars.DATABASE_NAME,
};

