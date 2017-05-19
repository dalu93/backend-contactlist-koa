export class ApiError extends Error {
  constructor(type, message, status) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.status = status
  }
}

export class InternalServerError extends ApiError {
  constructor(type = 'E_INTERNAL_SERVER_ERROR', message = 'Unknown error.') {
    super(type, message, 500)
  }
}

export class ValidationError extends ApiError {
  constructor(type = 'E_VALIDATION', message = 'Validation did not passed.') {
    super(type, message, 400)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(type = 'E_UNAUTHORIZED', message = 'The user was not authorized.') {
    super(type, message, 401)
  }
}

export class ForbiddenError extends ApiError {
  constructor(type = 'E_FORBIDDEN', message = 'The user is not allowed to access this resource.') {
    super(type, message, 403)
  }
}

export class NotFoundError extends ApiError {
  constructor(type = 'E_NOT_FOUND', message = 'Target resource was not found.') {
    super(type, message, 404)
  }
}

export class ConflictError extends ApiError {
  constructor(type = 'E_CONFLICT', message = 'Conflict record found.') {
    super(type, message, 409)
  }
}
