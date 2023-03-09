import { useParams } from "react-router-dom";

function Notes() {
  const { noteId } = useParams();

  const noteContent = `This is the content of note ${noteId}`;

  return (
    <div id="notesPageText">
      Note {noteId}: {noteContent}
    </div>
  );
}

export default Notes;

// function notes() {
//     return (
//         <div id = "notesPageText">
//             Select a note, or create a new one.
//         </div>
//     )
// };

// export default notes;