async function delete_note(this: HTMLImageElement){
    let id = this.parentElement?.getAttribute("note-id")
    await fetch("/api/delete_note?note_id="+id);
    refresh();
}

function add_note(id: number, content: string){
    let note = document.createElement("div");
    let img = document.createElement("img");
    note.setAttribute("note-id", id.toString());
    note.innerText = content;
    note.classList.add("note");
    img.src = "delete.png";
    img.addEventListener("click", delete_note);
    note.appendChild(img);
    document.body.appendChild(note);
}

async function refresh(){
    let res = await fetch("/api/notes");
    if(res.redirected) window.location.href = res.url;

    let notes: any[] = await res.json();

    document.querySelectorAll('.note').forEach(function(e) {
        e.remove();
    });

    notes.forEach(note => {
        add_note(note.note_id, note.content);
    });
}

refresh();