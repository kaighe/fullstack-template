import { Response } from 'express';
import { Database } from '../database/database';

declare global {
    namespace Express {
        interface Application{
            db: Database
        }

        interface Request {
            user?: User
        }
    }
}