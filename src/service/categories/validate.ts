import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const addAndUpdateCategoriesValidationRules = () => {
  return [
    body('name', 'Name of categorie is required').notEmpty(),
    body('description', 'Price decription is required').notEmpty(),
  ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any = []
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({ errors: extractedErrors })
}
