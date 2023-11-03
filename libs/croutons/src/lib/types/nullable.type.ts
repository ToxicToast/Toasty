import { Either } from './either.type';

export type Nullable<TType> = Either<TType, null>;
