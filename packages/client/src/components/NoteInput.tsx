import { useEffect, useRef, type KeyboardEvent } from "react"
import "./NoteInput.css"

type NoteInputProps = {
    on_post: (content: string) => void
}

function NoteInput(props: NoteInputProps){
    let input_ref = useRef<HTMLTextAreaElement>(null);

    function on_keydown(e: KeyboardEvent){
        if(input_ref.current && e.key == "Enter" && !e.shiftKey){
            e.preventDefault();
            props.on_post(input_ref.current.value);
            input_ref.current.value = "";
        }
        adjust_height();
    }

    function adjust_height(){
        if(!input_ref.current) return;
        input_ref.current.style.height = "1lh";
        input_ref.current.style.height = `calc(${input_ref.current?.scrollHeight}px - 1lh)`;
    }

    useEffect(adjust_height, []);

    return (
        <textarea
            ref={input_ref}
            className="note-input" 
            placeholder="Type a note..." 
            onKeyDown={on_keydown}
            onChange={adjust_height}
        />
    )
}

export default NoteInput