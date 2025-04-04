"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
// Decorator usage for custom repositories changed in TypeORM 0.3+ (no official decorators).
// Typically you'd define a class and maybe a custom function. Example:
class UserRepository extends typeorm_1.Repository {
}
exports.UserRepository = UserRepository;
