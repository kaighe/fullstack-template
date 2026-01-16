import type { Request as ExRequest, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorCode } from "shared/constants";
import type { User } from "shared/types";
import { password_hash } from "shared/utils";

type Body = {
    username: string,
    password: string
}
type Request = ExRequest<{}, any, Body, any>

export async function Login(req: Request, res: Response){
    let db = req.app.db;

    let [user] = await db.query<User[]>(`
        SELECT user_id, password, salt FROM Users
        WHERE username=? OR email=?
    `, [req.body.username, req.body.username])

    if(user == undefined) return res.status(400).json({error: ErrorCode.BAD_LOGIN});
    
    let hash = password_hash(req.body.password, user.salt);
    if(hash != user.password) return res.status(400).json({error: ErrorCode.BAD_LOGIN});

    let auth = jwt.sign({ user_id: user.user_id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: 86400 // 1 day
    })

    return res.cookie("auth", auth).sendStatus(200);
}