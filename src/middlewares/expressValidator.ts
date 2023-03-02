import { Response, Request, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';

export const validatorCar = [
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

export const putValidatorCar = [param('id').isUUID(), ...validatorCar];

export const validatorDriver = [
    body('name').isString(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const putValidatorDriver = [param('id').isUUID(), ...validatorDriver];

export const idValidator = [
    param('id').isUUID,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
