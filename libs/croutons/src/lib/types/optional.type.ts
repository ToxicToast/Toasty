import { Either } from './either.type';

export type Optional<TType> = Either<TType, undefined>;
