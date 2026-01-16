import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorCode } from "shared/constants";
import type { User } from "shared/types";

export async function Authenticate(req: Request, res: Response, next: NextFunction){
    let db = req.app.db;

    let token: string = req.cookies.auth;

    try{
        let payload: any = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        if(typeof(payload.user_id) !== "number") throw new Error();
        let [user] = await db.query<User[]>("SELECT user_id, username, email FROM Users WHERE user_id=?;", [payload.user_id]);
        if(user === undefined) throw new Error();
        
        req.user = user;
        next();
    }catch(e){
        return res.status(400).json({ error: ErrorCode.BAD_AUTH });
    }
}