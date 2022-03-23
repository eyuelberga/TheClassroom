import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { loader } from "graphql.macro";
import ResourceEditor from "../../components/Resource/ResourceEditor";
import SubNavigation from "../../components/App/SubNavigation";
import { Resource, ScheduledResource } from "../../interfaces";
import { toastifyError, toastifySuccess } from "../../utils";

const CREATE_RESOURCE = loader("../../queries/resources/create.gql");
const UPDATE_RESOURCE = loader("../../queries/resources/update.gql");
const SCHEDULE_RESOURCE = loader("../../queries/resources/schedule.gql");

export interface CreateProps {
  classroomId?: string;
  type: string;
}
const Create: React.FC<CreateProps> = ({ classroomId, type }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [resourcePayload, setResourcePayload] =
    useState<ScheduledResource | null>(null);
  const [create, { loading: saveLoading }] = useMutation(CREATE_RESOURCE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ resource }) => {
      const { id: newId } = resource;
      setId(newId);
      toastifySuccess({
        title: "Saved!",
        description: `${type} has been saved`,
      });
      navigate(-1);
    },
  });
  const [createAndSchedule, { loading: saveAndScheduleLoading }] = useMutation(
    CREATE_RESOURCE,
    {
      onError: (e) => {
        toastifyError(e);
      },
      onCompleted: ({ resource }) => {
        const { id: newId } = resource;
        setId(newId);
        toastifySuccess({
          title: "Saved!",
          description: `${type} has been saved`,
        });
        if (resourcePayload)
          schedule({
            variables: {
              id: newId,
              title: resourcePayload.title,
              content: resourcePayload.content,
              timestamp: resourcePayload.timestamp,
              type,
            },
          });
        navigate(-1);
      },
    }
  );
  const [update, { loading: updateLoading }] = useMutation(UPDATE_RESOURCE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ resource }) => {
      const { id: newId, published } = resource;
      setId(newId);
      if (published) {
        setIsPublished(true);
      }
      toastifySuccess({
        title: "Updated!",
        description: `${type} has been updated`,
      });
      navigate(-1);
    },
  });
  const [schedule, { loading: scheduleLoading }] = useMutation(
    SCHEDULE_RESOURCE,
    {
      onError: (e) => {
        toastifyError(e);
      },
      onCompleted: ({ resource, schedule: { date } }) => {
        const { id: newId, published } = resource;
        setId(newId);
        setScheduledDate(date);
        if (published) {
          setIsPublished(true);
        }
        setResourcePayload(null);
      },
    }
  );
  const save = () => {
    if (!isPublished) {
      if (id) {
        return ({ title, content }: Resource) => {
          update({
            variables: {
              id,
              title,
              content,
              published: false,
              type,
            },
          });
        };
      }
      return ({ title, content }: Resource) => {
        create({
          variables: {
            classroomId,
            title,
            content,
            type,
          },
        });
      };
    }
    return undefined;
  };
  const saveAndPublish = () => {
    if (id) {
      return ({ title, content }: Resource) => {
        update({
          variables: {
            id,
            title,
            content,
            published: true,
            type,
          },
        });
      };
    }
    return ({ title, content }: Resource) => {
      create({
        variables: {
          classroomId,
          title,
          content,
          type,
          published: true,
        },
      });
    };
  };
  const saveAndSchedule = () => {
    if (id) {
      return ({ title, content, timestamp }: ScheduledResource) => {
        schedule({
          variables: {
            id,
            title,
            content,
            timestamp,
            type,
          },
        });
      };
    }
    return ({ title, content, timestamp }: ScheduledResource) => {
      setResourcePayload({ title, content, timestamp });
      createAndSchedule({
        variables: {
          classroomId,
          title,
          content,
          type,
        },
      });
    };
  };
  const t = type === "NOTE" ? "Note" : "Assignment";
  return (
    <>
      <ResourceEditor
        action={
          <SubNavigation
            goBack
            title={`Add a new ${t}`}
            description={
              scheduledDate
                ? `Scheduled for: ${new Date(
                    scheduledDate
                  ).toDateString()}  ${new Date(
                    scheduledDate
                  ).toLocaleTimeString()}`
                : undefined
            }
          />
        }
        isLoading={
          saveLoading ||
          updateLoading ||
          scheduleLoading ||
          saveAndScheduleLoading
        }
        onSave={save()}
        onPublish={saveAndPublish()}
        onSchedule={saveAndSchedule()}
      />
    </>
  );
};
export default Create;
