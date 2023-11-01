import { Events } from '../enums';
import { Optional } from '../types';

export interface Plugin<Type> {
  name: string;
  event: Events;
  init?: Optional<() => void>;
  execute?: Optional<(data: Type) => void>;
}
