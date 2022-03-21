import React from "react";
import Classrooms from "../../views/Teacher/Classrooms";
import SubNavigation from "../../components/App/SubNavigation";
import NavMenu from "../../components/App/NavMenu";
const Page: React.FC<Record<string, any>> = () => {
  return (
    <>
      <SubNavigation
        title="Classrooms"
        action={
          <NavMenu
            actions={[
              {
                to: `/app/teach/create-classroom`,
                name: "New Classroom",
                icon: "plus",
              },
            ]}
          />
        }
      />
      <Classrooms
        editLink="/app/teach/update-classroom"
        previewLink="/app/teach/classroom"
      />
    </>
  );
};
export default Page;
