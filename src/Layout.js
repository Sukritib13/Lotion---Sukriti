import "./index.css";
import { NavLink, Outlet, useNavigate} from "react-router-dom";
import { useState} from "react";

function Layout() {
    
    var [toggleNote, changeToggleNote] = useState(true);
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [menuNotes, setMenuNotes] = useState([]);

    useEffect(() => {
        const storedNotes = localStorage.getItem("notes");
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
    }, []);
    
      
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);
    

    const addNote = () => {
    const noteId = notes.length + 1; 
    setNotes([...notes, noteId]);
    navigate(`/notes/${noteId}/edit`); 

    const newNote = { id: noteId, title: "Untitled", body: "", lastModified: Date.now()  };
    setMenuNotes((menuNotes) => [...menuNotes, newNote]);
    };

    const handleMenuNoteClick = (note) => {
        navigate(`/notes/${note.id}`);
    };
    

    return ( 
        <> 
            <div id ="container">
                <div id ="header">
                    <div>
                        <button id = "element" onClick={() => changeToggleNote(!toggleNote)}>&#9776;</button>
                    </div>
                    <div id=  "title"><h2>Lotion</h2>
                    Like Notion, but worse.
                    </div>
                </div> 
                <div id ="main">
                    {
                        toggleNote?
                        <div id ="menu">
                            <div id="notes">
                                <div><h3>Notes</h3></div>
                                <div><button id = "add" onClick={addNote}>+</button></div>
                            </div>
                            {menuNotes.length > 0 ? (
                            menuNotes.map((note) => (
                            <div key={note.id} id="menuNote"  onClick={() => handleMenuNoteClick(note)} >
                                <NavLink to={`/notes/${note.id}/edit`}>{note.title}</NavLink>
                            </div>
                            ))
                        ) : (
                            <div id="newNote">No Note Yet</div>
                        )}
                        </div>:
                        <></>
                    }

                    <div id="textArea">
                        <Outlet context={[notes]}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;