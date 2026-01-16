import type { Request as ExRequest, Response } from "express";

type Body = {}
type Query = {}
type Request = ExRequest<{}, any, Body, Query>

export async function Ping(req: Request, res: Response){
    return res.json({
        hello: "world"
    });
}