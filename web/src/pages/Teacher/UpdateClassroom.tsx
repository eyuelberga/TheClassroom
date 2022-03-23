import React from "react";
import { useParams } from "react-router-dom";
import UpdateClassroom from "../../views/Teacher/UpdateClassroom"
const Page: React.FC<Record<string, any>> = () => {
    const { classroomId } = useParams<{ classroomId: string }>();
    return <UpdateClassroom id={classroomId} />
}
export default Page;