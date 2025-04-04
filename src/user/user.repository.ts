import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

// Decorator usage for custom repositories changed in TypeORM 0.3+ (no official decorators).
// Typically you'd define a class and maybe a custom function. Example:
export class UserRepository extends Repository<User> {
  // Define custom methods here if you want. 
  // e.g. advanced queries or extra logic
}
