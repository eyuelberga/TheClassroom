import React, { useState } from "react";
import { Button, Input, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loader } from "graphql.macro";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import ClassroomList from "../../components/Classroom/ClassroomList";
import StatsCard from "../../components/App/StatsCard";
import { FETCH_LIMIT as limit } from "../../config/constants";
import { toastifyError, toastifySuccess } from "../../utils";

const GET_CLASSROOMS_BY_USER = loader("../../queries/classrooms/list.gql");
const ENROLL = loader("../../queries/classrooms/enroll.gql");

export interface ManageProps {
  previewLink: string;
}

const Manage: React.FC<ManageProps> = ({ previewLink }) => {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const [classCode, setClassCode] = useState("");
  const query = GET_CLASSROOMS_BY_USER;
  const { error, loading } = useQuery(query, {
    fetchPolicy: "network-only",
    variables: {
      limit,
    },
    onCompleted: ({
      classrooms: ns,
      total: {
        aggregate: { count },
      },
    }) => {
      const fetchedClassrooms = [...(ns as any[])];
      setClassrooms(fetchedClassrooms);
      setTotal(count);
      setTotalLeft(count - fetchedClassrooms.length);
    },
  });

  const [more, { loading: moreLoading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ classrooms: moreNs }) => {
      const moreClassrooms = moreNs as any[];
      setTotalLeft(totalLeft - moreClassrooms.length);
      setClassrooms([...classrooms, ...moreClassrooms]);
    },
  });

  const loadMore = () => {
    more({
      variables: {
        limit,
        cursor:
          classrooms[classrooms.length ? classrooms.length - 1 : 0].updatedAt,
      },
    });
  };

  const [enroll, { loading: enrollLoading }] = useMutation(ENROLL, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ classroom: { classroom_id: newClassroom } }) => {
      toastifySuccess({
        title: "Enrolled !",
        description: "you have successfully enrolled to the class",
      });
      navigate(`/app/student/classroom/${newClassroom}`);
    },
  });

  return (
    <>
      <StatsCard
        title="Classrooms"
        description="classes you are currently enrolled in"
        icon={["far", "file"]}
      />
      <Flex>
        <Input
          placeholder="Classroom Code"
          value={classCode}
          onChange={(e) => {
            setClassCode(e.target.value);
          }}
        />
        <Button
          ml={1}
          isDisabled={!classCode}
          isLoading={enrollLoading}
          onClick={() => {
            enroll({ variables: { classroomId: classCode } });
          }}
        >
          Enroll
        </Button>
      </Flex>
      <ClassroomList
        error={error}
        link={previewLink}
        loading={loading}
        data={classrooms}
        footer={
          <Button
            isDisabled={totalLeft <= 0}
            colorScheme="gray"
            variant="link"
            onClick={loadMore}
            isLoading={moreLoading}
          >
            Load more..
          </Button>
        }
      />
    </>
  );
};

export default Manage;
