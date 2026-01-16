import { useEffect, useState } from "react"
import type { Note } from "shared/types";
import NoteContainer from "../../components/NoteContainer";
import NoteInput from "../../components/NoteInput";
import { useNavigate } from "react-router-dom";

function Notes(){
    const navigate = useNavigate();
    const [notes, set_notes] = useState<Note[]>([]);
    const [loading, set_loading] = useState(true);

    async function update_notes(){
        let r = await fetch("/api/notes");
        console.log(r.status)
        if(!r.ok){
            navigate("/login");
            return;
        }
        let data = await r.json();

        set_notes(data);

        if(loading) set_loading(false);
    }

    function on_delete(_: Note){
        update_notes();
    }

    async function add_note(content: string){
        let r = await fetch("/api/add_note", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                content
            })
        })
        if(!r.ok) alert("Failed to post note.");
        await update_notes();
    }

    useEffect(() => {
        update_notes();
    }, [])

    return <>
        {notes.map(note => (
            <NoteContainer key={note.note_id} note={note} on_delete={on_delete}></NoteContainer>
        ))}
        <NoteInput on_post={add_note}></NoteInput>
    </>
}

export default Notes