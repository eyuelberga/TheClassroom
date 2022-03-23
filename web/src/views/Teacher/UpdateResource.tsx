import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useNavigate } from "react-router-dom";
import ResourceEditor from "../../components/Resource/ResourceEditor";
import ResourceDisplaySkeleton from "../../components/Resource/ResourceDisplaySkeleton";
import EmptyPlaceholder from "../../components/App/EmptyPlaceholder";
import SubNavigation from "../../components/App/SubNavigation";
import { Resource, ScheduledResource } from "../../interfaces";
import { alert, toastifyError, toastifySuccess } from "../../utils";
import AsyncRender from "../../components/App/AsyncRender";

const GET_RESOURCE = loader("../../queries/resources/detail-for-update.gql");
const UPDATE_RESOURCE = loader("../../queries/resources/update.gql");
const SCHEDULE_RESOURCE = loader("../../queries/resources/schedule.gql");
export interface UpdateProps {
  id?: string;
}
const Update: React.FC<UpdateProps> = ({ id }) => {
  const navigate  = useNavigate();
  const [resource, setResource] = useState<Resource | undefined>();
  const [isPublished, setIsPublished] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const { error, loading } = useQuery(GET_RESOURCE, {
    fetchPolicy: "network-only",
    variables: {
      id,
    },
    onCompleted: ({ resource: n }) => {
      setResource(n);
      setIsPublished(n.published);
      if (!n.published) setScheduledDate(n.schedule);
    },
  });
  const [update, { loading: updateLoading }] = useMutation(UPDATE_RESOURCE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ resource: { published } }) => {
      if (published) {
        setIsPublished(true);
      }
      toastifySuccess({
        title: "Updated!",
        description: "your updated has been saved",
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
      onCompleted: ({ resource: { published }, schedule: { date } }) => {
        setScheduledDate(date);
        if (published) {
          setIsPublished(true);
        }
        toastifySuccess({
          title: "Scheduled!",
          description: "your updated has been saved",
        });
        navigate(-1);
      },
    }
  );
  const save = () => {
    if (!isPublished && id) {
      return ({ title, content }: Resource) => {
        update({
          variables: {
            id,
            title,
            content,
            published: false,
          },
        });
      };
    }
    return undefined;
  };
  const saveAndSchedule = () => {
    if (!isPublished && id) {
      return ({ title, content, timestamp }: ScheduledResource) => {
        schedule({
          variables: {
            id,
            title,
            content,
            timestamp,
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
          },
        });
      };
    }
    return undefined;
  };
  const displayData = () => {
    if (id && resource) {
      return (
        <ResourceEditor
          action={
            <SubNavigation
              goBack
              title="Update"
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
          isLoading={updateLoading || scheduleLoading}
          content={resource.content}
          title={resource.title}
          onSave={save()}
          onPublish={saveAndPublish()}
          onSchedule={saveAndSchedule()}
        />
      );
    }
    return undefined;
  };
  return (
    <>
      <AsyncRender
        loading={loading}
        skeleton={<ResourceDisplaySkeleton isDetailed />}
        data={displayData()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="Nothing Here!" />
        }
      />
    </>
  );
};
export default Update;
