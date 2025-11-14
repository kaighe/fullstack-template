import { Request as ExRequest, Response } from "express";

type Query = {
    username: string,
    password: string
}
type Request = ExRequest<{}, any, any, Query>

export async function Notes(req: Request, res: Response){
    if(!req.user) return res.sendStatus(400);
    let db = req.app.db;

    let notes = await db.query<Note[]>(`
        SELECT * FROM Notes
        WHERE user_id=?
    `, [req.user.user_id])

    return res.send(notes);
}