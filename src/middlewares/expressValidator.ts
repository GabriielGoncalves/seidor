import { Response, Request, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';

export const validator = [
    body('licensePlate').isLength({ min: 7, max: 7 }).isString(),
    body('brand').isString(),
    body('color').isLength({ min: 3 }).isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const putValidator = [param('id').isUUID(), ...validator];
