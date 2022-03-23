import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { loader } from "graphql.macro";
import { useQuery, useLazyQuery } from "@apollo/client";
import UserList from "../../components/User/UserList";
import StatsCard from "../../components/App/StatsCard";
import { FETCH_LIMIT as limit } from "../../config/constants";
import { toastifyError } from "../../utils";

const GET_ENROLLMENTS_CLASSROOM = loader(
  "../../queries/classrooms/enrollments.gql"
);

export interface ManageUsersProps {
  previewLink: string;
  classroomId?: string;
}

const Manage: React.FC<ManageUsersProps> = ({ classroomId, previewLink }) => {
  const [resources, setUsers] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const query = GET_ENROLLMENTS_CLASSROOM;
  const { error, loading } = useQuery(query, {
    fetchPolicy: "network-only",
    variables: {
      classroomId,
      limit,
    },
    onCompleted: ({ enrollments: ns, total: t }) => {
      const fetchedUsers = ns as any[];
      setUsers(
        fetchedUsers.map(
          ({ student: { fullname, username, profilePicture }, updatedAt }) => {
            return { fullname, username, profilePicture, updatedAt };
          }
        )
      );
      setTotal(t.aggregate.count);
      setTotalLeft(t.aggregate.count - fetchedUsers.length);
    },
  });

  const [more, { loading: moreLoading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ resources: moreNs }) => {
      const moreUsers = moreNs as any[];
      setTotalLeft(totalLeft - moreUsers.length);
      setUsers([...resources, ...moreUsers]);
    },
  });
  const loadMore = () => {
    more({
      variables: {
        classroomId,
        limit,
        cursor:
          resources[resources.length ? resources.length - 1 : 0].updatedAt,
      },
    });
  };
  return (
    <>
      <StatsCard
        title="Enrollments"
        stat={`${total}`}
        description="students currently enrolled in the class"
        icon={["far", "file"]}
      />

      <UserList
        link={previewLink}
        error={error}
        loading={loading}
        data={resources}
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
