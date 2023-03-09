import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./Notes";
import Layout from "./Layout";
import EditNote from "./EditNote";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Notes />}></Route>
          <Route path="/notes/:noteId" element={<Notes />} />
          <Route path="/notes/:noteId/edit" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
