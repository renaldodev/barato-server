import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const addAndUpdateProductValidationRules = () => {
  return [
    body('name', 'Name is required').notEmpty(),
    body('price', 'Price is required').notEmpty().isNumeric(),
    body('categorie', 'Categorie type is required').notEmpty(),
  ]
}


export const addAndUpdateCategoriesValidationRules = () => {
    return [
      body('name', 'Name is required').notEmpty(),
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
