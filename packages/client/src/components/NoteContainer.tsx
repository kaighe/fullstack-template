import type { Note } from "shared/types";
import "./NoteContainer.css"

interface NoteProps {
    note: Note
    on_delete?: (note: Note) => void
}

function NoteContainer( props: NoteProps ){
    async function delete_note(){
        let r = await fetch("/api/delete_note", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                note_id: props.note.note_id
            })
        });

        if(r.ok && props.on_delete) props.on_delete(props.note);
    }

    return <div className="note">
        {props.note.content}
        <img className="delete-note" src="/icons/close.png" onClick={delete_note} />
    </div>
}

export default NoteContainer;