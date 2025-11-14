import { Request as ExRequest, Response } from "express";
import * as validation from "@my-app/shared/utils/validation";
import * as crypto from "@my-app/shared/utils/crypto";
import * as jwt from "jsonwebtoken";

type Query = {
    username: string,
    email: string,
    password: string
}
type Request = ExRequest<{}, any, any, Query>

export async function CreateAccount(req: Request, res: Response){
    let db = req.app.db;

    if(!validation.valid_email(req.query.email)) return res.sendStatus(400);
    if(!validation.valid_username(req.query.username)) return res.sendStatus(400);
    if(!validation.valid_password(req.query.password)) return res.sendStatus(400);

    let salt = crypto.generate_salt();

    let hash = crypto.password_hash(req.query.password, salt);

    let [{ user_id }] = await db.query<any>(`
        INSERT INTO Users (username, email, password, salt) 
        VALUES (?, ?, ?, ?) 
        RETURNING user_id
    `, [
        req.query.username,
        req.query.email,
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

    return res.cookie("auth", auth).redirect("/");
}