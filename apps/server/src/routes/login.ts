import { password_hash } from "@my-app/shared/utils/crypto";
import { Request as ExRequest, Response } from "express";
import * as jwt from "jsonwebtoken";

type Query = {
    username: string,
    password: string
}
type Request = ExRequest<{}, any, any, Query>

export async function Login(req: Request, res: Response){
    let db = req.app.db;

    let [{ user_id, password, salt }] = await db.query<any[]>(`
        SELECT user_id, password, salt FROM Users
        WHERE username=? OR email=?
    `, [req.query.username, req.query.username])

    
    let hash = password_hash(req.query.password, salt);
    if(hash != password) return res.sendStatus(400);

    let auth = jwt.sign({ user_id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: 86400 // 1 day
    })

    return res.cookie("auth", auth).redirect("/");
}