export type User = {
    user_id: number,
    username: string,
    email: string
}

export type Note = {
    note_id: number,
    user_id: number,
    content: string
}