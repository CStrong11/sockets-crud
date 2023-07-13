import Note from "./models/note";

export default (io) => {
  io.on("connection", (socket) => {
    const emitNotes = async () => {
      const notes = await Note.find();
      io.emit("server:loadNotes", notes);
    };
    emitNotes();

    socket.on("client:newNote", async (data) => {
      const newNote = new Note(data);
      const savedNote = await newNote.save();
      io.emit("server:newNote", savedNote);
    });
    socket.on("client:deleteNote", async (id) => {
      const deletedNote = await Note.findByIdAndDelete(id);
      io.emit("server:deleteNote", deletedNote);
      emitNotes();
    });
    socket.on("client:getNote", async (id) => {
      const note = await Note.findById(id);
      io.emit("server:selectedNote", note);
    });
    socket.on("client:updateNote", async (updateNote) => {
      await Note.findByIdAndUpdate(updateNote._id, {
        title: updateNote.title,
        description: updateNote.content,
      });
      emitNotes();
    });
  });
};
