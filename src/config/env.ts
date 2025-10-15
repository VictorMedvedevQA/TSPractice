const dotenv = require('dotenv');

// Загружаем env-файл
dotenv.config();

// Интерфейс для типизации
interface EnvConfig {
	BASE_URL: string;
	USER_EMAIL: string;
	USER_PASSWORD: string;
	API_BASE_URL: string;
	HEADLESS: boolean;
	SLOW_MO: number;
	TIMEOUT: number;
	// Добавьте другие переменные по необходимости
}

// Валидация и преобразование переменных
const getEnvVariable = (key: string): string => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Environment variable ${key} is not set`);
	}
	return value;
};

const getEnvVariableOptional = (key: string, defaultValue: string = ''): string => {
	return process.env[key] || defaultValue;
};

// Создаем конфигурационный объект
export const envConfig: EnvConfig = {
	BASE_URL: getEnvVariable('BASE_URL'),
	USER_EMAIL: getEnvVariable('USER_EMAIL'),
	USER_PASSWORD: getEnvVariable('USER_PASSWORD'),
	API_BASE_URL: getEnvVariable('API_BASE_URL'),
	HEADLESS: getEnvVariableOptional('HEADLESS', 'true') === 'true',
	SLOW_MO: parseInt(getEnvVariableOptional('SLOW_MO', '0')),
	TIMEOUT: parseInt(getEnvVariableOptional('TIMEOUT', '30000')),
};

// Экспортируем отдельные переменные для удобства
export const {
	BASE_URL,
	USER_EMAIL,
	USER_PASSWORD,
	API_BASE_URL,
	HEADLESS,
	SLOW_MO,
	TIMEOUT,
} = envConfig;