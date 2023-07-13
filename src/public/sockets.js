const socket = io();

export const loadNotes = (callback) => {
  socket.on("server:loadNotes", callback);
};

export const saveNotes = (title, description) => {
  socket.emit("client:newNote", {
    title,
    description,
  });
};

export const onNewNote = (callback) => {
  socket.on("server:newNote", callback);
};

export const deleteNote = (id) => {
  socket.emit("client:deleteNote", id);
};

export const getNote = (id) => {
  socket.emit("client:getNote", id);
};

export const selectedNote = (callback) => {
  socket.on("server:selectedNote", callback);
};

export const updateNote = (id, title, description) => {
  socket.emit("client:updateNote", {
    _id: id,
    title,
    description,
  });
};
