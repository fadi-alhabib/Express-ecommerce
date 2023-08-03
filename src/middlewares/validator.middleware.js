import { validationResult } from 'express-validator';

const validatorMiddleware = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  next();
};
export default validatorMiddleware;
