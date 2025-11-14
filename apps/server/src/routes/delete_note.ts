import { password_hash } from "@my-app/shared/utils/crypto";
import { Request as ExRequest, Response } from "express";

type Query = {
    note_id: string
}
type Request = ExRequest<{}, any, any, Query>

export async function DeleteNote(req: Request, res: Response){
    let db = req.app.db;

    db.query<Note[]>(`
        DELETE FROM Notes
        WHERE note_id=? AND user_id=?
    `, [req.query.note_id, req.user?.user_id])

    return res.sendStatus(200);
}