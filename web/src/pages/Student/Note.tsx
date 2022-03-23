import React from "react";
import { useParams } from "react-router-dom";
import PreviewResource from "../../views/Student/PreviewResource"
const Page: React.FC<Record<string, any>> = () => {
    const { noteId } = useParams<{ noteId: string }>();
    return <PreviewResource id={noteId} />
}
export default Page;