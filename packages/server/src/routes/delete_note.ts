import type { Request as ExRequest, Response } from "express";
import type { Note } from "shared/types";

type Body = {
    note_id: string
}
type Query = {}
type Request = ExRequest<{}, any, Body, Query>

export async function DeleteNote(req: Request, res: Response){
    let db = req.app.db;

    db.query<Note[]>(`
        DELETE FROM Notes
        WHERE note_id=? AND user_id=?
    `, [req.body.note_id, req.user?.user_id])

    return res.sendStatus(200);
}