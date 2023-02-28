import { Response, Request, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validator = [
    body('placa').isLength({ min: 7, max: 7 }).isString(),
    body('marca').isString(),
    body('cor').isLength({ min: 3 }).isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
