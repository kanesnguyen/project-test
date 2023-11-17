import { Error, ValidationErrorItem } from 'sequelize';

class CustomError extends Error {
  public path: string
  constructor (message: string, path?: string) {
    super(message);
    this.path = path;
  }
}

export const FailValidation = (errors: ValidationErrorItem[]) => {
  const messages: any = {};
  errors.forEach((error) => {
    const path = (error.original as CustomError)?.path || error.path;
    const message = (error.original as CustomError)?.message || error.message;
    messages[path] ||= [];
    messages[path].push(message);
  });
  return {
    code: 120,
    messages,
  };
};

export const NoData = {
  code: 8,
  message: 'No data available',
};

export const InternalError = {
  code: 131,
  message: 'Internal error',
};

export const BadAuthentication = {
  code: 215,
  message: 'Bad authentication data',
};

export const FileIsNotSupport = {
  code: 305,
  message: 'The file is not in the required format',
};

export const UnableToModifyQuestion = {
  code: 370,
  message: 'Unable to modify question in used',
};

export const ExerciseReachMaxAttempts = {
  code: 386,
  message: 'Exercise reach max attempts',
};

export const Unauthorized = {
  code: 403,
  message: 'Not authorize to access this route',
};

export const InvalidPassword = {
  code: 425,
  message: 'invalid password',
};

export const invalidParameter = {
  code: 415,
  message: 'invalid parameter',
};

export const ServiceUnavailable = {
  code: 503,
  message: 'Service unavailable',
};
