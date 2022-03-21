import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loader } from "graphql.macro";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import ClassroomList from "../../components/Classroom/ClassroomList";
import StatsCard from "../../components/App/StatsCard";
import { FETCH_LIMIT as limit } from "../../config/constants";
import { toastifyError } from "../../utils";

const GET_CLASSROOMS_BY_USER = loader(
  "../../queries/classrooms/list.gql"
);

const REMOVE_CLASSROOM = loader("../../queries/classrooms/remove.gql");

export interface ManageProps {
  editLink: string;
  previewLink: string;
}

const Manage: React.FC<ManageProps> = ({ editLink, previewLink }) => {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
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
  const [remove, { loading: removeLoading }] = useMutation(REMOVE_CLASSROOM, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ classroom }) => {
      const { id: deletedId } = classroom;
      setClassrooms(
        classrooms.filter(({ id }) => {
          return id !== deletedId;
        })
      );
      setTotal(total - 1);
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
  const onRemove = (id: string) => {
    if (window.confirm("Are you sure? this action is permanent")) {
      remove({ variables: { id } });
    }
  };
  return (
    <>
      <StatsCard
        title="Total"
        stat={`${total}`}
        icon={["far", "file"]}
      />

      <ClassroomList
        error={error}
        onRemove={onRemove}
        onEdit={(id) => {
          navigate(`${editLink}/${id}`);
        }}
        onPreview={(id) => {
          navigate(`${previewLink}/${id}`);
        }}
        loading={loading || removeLoading}
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
