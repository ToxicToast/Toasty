import { Authentication } from './authentication.interface';
import { Optional } from '../types';

export interface Option {
  logging?: Optional<boolean>;
  authentication: Authentication;
  channels: Array<string>;
}
