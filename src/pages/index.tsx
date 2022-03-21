import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import AppLayout from "./AppLayout";
import TeacherLayout from "./TeacherLayout";
import StudentLayout from "./StudentLayout";
import AppIndex from "./AppIndex";
import NotFound from "./NotFound";
import Unauthorized from "./Unauthorized";
import Landing from "./Landing";
import About from "./About";
import TClassrooms from "./Teacher/Classrooms";
import SClassrooms from "./Student/Classrooms";
import TClassroom from "./Teacher/Classroom";
import SClassroom from "./Student/Classroom";
import TNote from "./Teacher/Note";
import TAssignment from "./Teacher/Assignment";
import SNote from "./Student/Note";
import SAssignment from "./Student/Assignment";
import TCreateClassroom from "./Teacher/CreateClassroom";
import TCreateNote from "./Teacher/CreateNote";
import TCreateAssignment from "./Teacher/CreateAssignment";
import TUpdateClassroom from "./Teacher/UpdateClassroom";
import TUpdateNote from "./Teacher/UpdateNote";
import TUpdateAssignment from "./Teacher/UpdateAssignment";
const App: React.FC<Record<string, never>> = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppIndex />} />
        <Route path="teach" element={<TeacherLayout />}>
          <Route index element={<TClassrooms />} />
          <Route path="classroom/:classroomId" element={<TClassroom />} />
          <Route path="note/:noteId" element={<TNote />} />
          <Route path="assignment/:assignmentId" element={<TAssignment />} />
          <Route path="create-note/:classroomId" element={<TCreateNote />} />
          <Route
            path="create-assignment/:classroomId"
            element={<TCreateAssignment />}
          />
          <Route path="update-note/:noteId" element={<TUpdateNote />} />
          <Route
            path="update-assignment/:assignmentId"
            element={<TUpdateAssignment />}
          />
          <Route path="create-classroom" element={<TCreateClassroom />} />
          <Route
            path="update-classroom/:classroomId"
            element={<TUpdateClassroom />}
          />
        </Route>
        <Route path="student" element={<StudentLayout />}>
          <Route index element={<SClassrooms />} />
          <Route path="classroom/:classroomId" element={<SClassroom />} />
          <Route path="note/:noteId" element={<SNote />} />
          <Route path="assignment/:assignmentId" element={<SAssignment />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
