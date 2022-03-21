import React from "react";
import { useParams } from "react-router-dom";
import UpdateResource from "../../views/Teacher/UpdateResource"
const Page: React.FC<Record<string, any>> = () => {
    const { noteId } = useParams<{ noteId: string }>();
    return <UpdateResource id={noteId} />
}
export default Page;