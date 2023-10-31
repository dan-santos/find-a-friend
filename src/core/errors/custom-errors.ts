export class WrongTypeError extends Error{
  constructor(field: string, expectedType: string) {
    super(`Field "${field}" is incorrectly typed (expect to be ${expectedType})`);
  }
}