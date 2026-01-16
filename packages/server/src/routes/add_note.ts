import type { Request as ExRequest, Response } from "express";
import { ErrorCode } from "shared/constants";
import type { Note } from "shared/types";

type Body = {
    content: string
}
type Query = {}
type Request = ExRequest<{}, any, Body, Query>

export async function AddNote(req: Request, res: Response){
    let db = req.app.db;

    if(!req.user) return res.status(400).json({ error: ErrorCode.BAD_AUTH })

    db.query<any>(`
        INSERT INTO Notes (user_id, content)
        VALUES (?, ?)
    `, [req.user.user_id, req.body.content])

    return res.sendStatus(200);
}