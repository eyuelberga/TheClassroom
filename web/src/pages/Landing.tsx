import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import { useQuery as useURLQuery } from "../hooks";

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  const queryRef = useRef(useURLQuery());
  useEffect(() => {
    const error = queryRef.current.get("error");
    if (error)
      window.alert(
        "Sorry, we are facing some technical issues. Please try again later."
      );
  }, []);
  return (
    <>
      <Hero
        title="The Classroom"
        subtitle="Open-source Learning Management System"
        image="https://unsplash.com/photos/OyCl7Y4y0Bk/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ3NzgwNDUw&force=true&w=640"
        onGetStarted={() => {
          navigate("/app");
        }}
        onHowItWorks={() => {
          navigate("/about");
        }}
      />
      <Features
        image="https://unsplash.com/photos/vFJNeWJAA2g/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MjV8fHRlYWNoZXJ8ZW58MHx8fHwxNjQ3NzYyNDg2&force=true&w=640"
        features={[
          {
            icon: <FontAwesomeIcon icon="chalkboard" />,
            title: "Manage multiple classrooms",
          },
          {
            icon: <FontAwesomeIcon icon="file" />,
            title: "Post Assignments and Notes to students",
          },
          {
            icon: <FontAwesomeIcon icon={["far", "calendar-alt"]} />,
            title: "Schedule your new posts ahead of time",
          },
          {
            icon: <FontAwesomeIcon icon="envelope" />,
            title: "Student will get notified when new class resources are avaliable",
          },
        ]}
      />
    </>
  );
}
