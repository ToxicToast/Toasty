import { Events } from '../enums';
import { Optional } from '../types';

export interface Plugin<Type, Formatted = any> {
  name: string;
  event: Events;
  init?: Optional<() => void>;
  execute?: Optional<(data: Type, formatted?: Optional<Formatted>) => void>;
}
