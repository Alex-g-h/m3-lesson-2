const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreenBright("Note was added!"));
}

async function getNotes() {
  const notesStr = await fs.readFile(notesPath, { encoding: "utf-8" });
  const notes = JSON.parse(notesStr);

  return Array.isArray(notes) ? notes : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue(`Here is the list of ${notes.length} notes:`));
  let index = 1;
  notes.forEach((note) => {
    console.log(
      ` ${index++}. ${chalk.bgBlueBright("#" + note.id)}`,
      chalk.blue(note.title)
    );
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const noteToRemoveIndex = notes.findIndex((note) => note.id === id);
  if (noteToRemoveIndex === -1) {
    console.log(chalk.bgRedBright(`Note (#${id}) not found!`));
    return;
  }

  notes.splice(noteToRemoveIndex, 1);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreenBright(`Note (#${id}) successfully removed.`));
}

async function editNote(id, newTitle) {
  const notes = await getNotes();
  const noteToEditIndex = notes.findIndex((note) => note.id === id);
  if (noteToEditIndex === -1) {
    console.log(chalk.bgRedBright(`Note (#${id}) not found!`));
    return;
  }

  notes[noteToEditIndex].title = newTitle;
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreenBright(`Note (#${id}) successfully edited.`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
