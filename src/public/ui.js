import { saveNotes, deleteNote, getNote, updateNote } from "./sockets.js";

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
let saveId = "";

const noteUi = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
          <div class="card card-body rounded-0 mb-2">
              <div class="d-flex justify-content-space-between">
                <h1>${note.title}</h1>
                <div>
                  <button class="delete btn btn-danger btn-sm" data-id="${note._id}">Delete</button>
                  <button class="update btn btn-secondary btm-sm" data-id="${note._id}">Update</button>
                </div>
              </div>
            <p>${note.description}</p>
          </div>`;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnUpdate.addEventListener("click", (e) => {
    getNote(btnUpdate.dataset.id);
  });
  btnDelete.addEventListener("click", (e) => {
    deleteNote(btnDelete.dataset.id);
    saveId = "";
  });
  return div;
};

export const renderNotes = (notes) => {
  notesList.innerHTML = "";
  notes.forEach((note) => notesList.append(noteUi(note)));
};

export const onHandleSubmit = (e) => {
  e.preventDefault();

  if (saveId) {
    updateNote(saveId, title.value, description.value);
  } else {
    saveNotes(title.value, description.value);
  }
  saveId = "";
  title.value = "";
  description.value = "";
};

export const appendNote = (note) => {
  notesList.append(noteUi(note));
};

export const fillForm = (note) => {
  title.value = note.title;
  description.value = note.description;
  saveId = note._id;
};
