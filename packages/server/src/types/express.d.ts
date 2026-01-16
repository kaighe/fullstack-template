import { Response } from 'express';
import { Database } from '../database/database';
import type { User } from 'shared/types';

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