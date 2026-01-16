import type { Request as ExRequest, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorCode } from "shared/constants";
import { generate_salt, password_hash, valid_email, valid_password, valid_username } from "shared/utils";

type Body = {
    username: string,
    email: string,
    password: string
}
type Request = ExRequest<{}, any, Body, any>

export async function CreateAccount(req: Request, res: Response){
    let db = req.app.db;

    if(!valid_username(req.body.username)) return res.status(400).json({error: ErrorCode.BAD_USERNAME});
    if(!valid_email(req.body.email)) return res.status(400).json({error: ErrorCode.BAD_EMAIL});
    if(!valid_password(req.body.password)) return res.status(400).json({error: ErrorCode.BAD_PASSWORD});

    let salt = generate_salt();
    let hash = password_hash(req.body.password, salt);

    let users = await db.query<any[]>(`
        SELECT 1 FROM Users
        WHERE username=?
    `, [req.body.username])
    if(users.length != 0) return res.status(400).json({error: ErrorCode.INUSE_USERNAME});

    users = await db.query<any[]>(`
        SELECT 1 FROM Users
        WHERE email=?
    `, [req.body.email])
    if(users.length != 0) return res.status(400).json({error: ErrorCode.INUSE_EMAIL});

    let [{ user_id }] = await db.query<any>(`
        INSERT INTO Users (username, email, password, salt) 
        VALUES (?, ?, ?, ?) 
        RETURNING user_id
    `, [
        req.body.username,
        req.body.email,
        hash,
        salt
    ])

    for(var i = 0; i < 10; i++){
        db.query(`
            INSERT INTO Notes (user_id, content)
            VALUES (?, ?)
        `, [user_id, "test note " + i])
    }

    let auth = jwt.sign({ user_id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: 86400 // 1 day
    })

    return res.cookie("auth", auth).sendStatus(200);
}