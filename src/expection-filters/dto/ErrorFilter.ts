import { EntityNotFoundError } from 'typeorm';

type response = {
  message: string[];
}

export interface ErrorFilter extends EntityNotFoundError {
  response: response | string;
  status: number;
  message: string;
}
