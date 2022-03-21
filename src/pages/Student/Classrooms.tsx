import React from "react";
import Classrooms from "../../views/Student/Classrooms"
const Page: React.FC<Record<string, any>> = () => {
    return <Classrooms previewLink="/app/student/classroom" />
}
export default Page;