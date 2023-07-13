import { loadNotes, onNewNote, selectedNote } from "./sockets.js";
import { onHandleSubmit, renderNotes, appendNote, fillForm } from "./ui.js";

onNewNote(appendNote);
loadNotes(renderNotes);
selectedNote(fillForm);

const noteForm = document.querySelector("#noteForm");

noteForm.addEventListener("submit", onHandleSubmit);
