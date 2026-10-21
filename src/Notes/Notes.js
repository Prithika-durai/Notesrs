import React, { useEffect, useState } from "react";
function Notes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  
  const handleSubmit = () => {
    if (!title.trim() && !content.trim()) {
      alert("Please write something!");
      return;
    }

    if (editingId) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title,
                content: content,
                updatedAt: new Date().toLocaleString(),
              }
            : note
        )
      );

      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title,
        content: content,
        pinned: false,
        createdAt: new Date().toLocaleString(),
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

 
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  
  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      )
    );
  };

  
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

 
  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="app">
      {}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">✦</span>
          <div>
            <h1>NoteNest</h1>
            <p>Your little space for big ideas</p>
          </div>
        </div>

        <div className="note-count">
          <strong>{notes.length}</strong>
          <span>Notes</span>
        </div>
      </header>

      {}
      <main className="container">

        {}
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {}
        <section className="editor-card">
          <div className="editor-heading">
            <span className="pencil">✎</span>
            <div>
              <h2>{editingId ? "Edit Note" : "Create a Note"}</h2>
              <p>
                {editingId
                  ? "Update your thoughts"
                  : "Capture your thoughts and ideas"}
              </p>
            </div>
          </div>

          <input
            className="title-input"
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="content-input"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="editor-actions">
            {editingId && (
              <button className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}

            <button className="save-btn" onClick={handleSubmit}>
              {editingId ? "✓ Update Note" : "+ Save Note"}
            </button>
          </div>
        </section>

        {}
        <div className="notes-heading">
          <div>
            <h2>My Notes</h2>
            <p>
              {filteredNotes.length}{" "}
              {filteredNotes.length === 1 ? "note" : "notes"} found
            </p>
          </div>
        </div>

        {}
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No notes yet</h3>
            <p>Create your first note and start capturing your ideas.</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <article
                className={`note-card ${
                  note.pinned ? "pinned-card" : ""
                }`}
                key={note.id}
              >
                <div className="note-top">
                  <span className="note-date">
                    {note.updatedAt
                      ? `Updated ${note.updatedAt}`
                      : note.createdAt}
                  </span>

                  <button
                    className={`pin-btn ${
                      note.pinned ? "active-pin" : ""
                    }`}
                    onClick={() => togglePin(note.id)}
                    title="Pin note"
                  >
                    📌
                  </button>
                </div>

                <h3>{note.title || "Untitled Note"}</h3>

                <p className="note-content">
                  {note.content || "No content"}
                </p>

                <div className="note-footer">
                  <button
                    className="edit-btn"
                    onClick={() => editNote(note)}
                  >
                    ✎ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>Made with React ✦ Keep your ideas close.</p>
      </footer>
    </div>
  );
}

export default Notes;