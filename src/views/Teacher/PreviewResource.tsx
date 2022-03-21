import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResourceDisplay from '../../components/Resource/ResourceDisplay';
import ResourceDisplaySkeleton from '../../components/Resource/ResourceDisplaySkeleton';
import EmptyPlaceholder from '../../components/App/EmptyPlaceholder';
import SubNavigation from '../../components/App/SubNavigation';
import { alert } from '../../utils';
import AsyncRender from '../../components/App/AsyncRender';

const GET_RESOURCE = loader('../../queries/resources/detail.gql');

export interface DetailProps {
  id?: string;
  editLink: string;
}

const Detail: React.FC<DetailProps> = ({ id, editLink }) => {
  const navigate = useNavigate();
  const [resource, setResource] = useState<any>(null);

  const { error, loading } = useQuery(GET_RESOURCE, {
    variables: {
      id,
    },
    onCompleted: ({
      resource: n
    }) => {
      setResource(n);
      window.scrollTo({ top: 0 });
    },
  });

  const DataDisplay = () => {
    return (
      <>
        <ResourceDisplay
          id={resource.id}
          title={resource.title}
          updatedAt={resource.updatedAt}
          content={resource.content}

        />
      </>
    );
  };
  const displayData = () => {
    if (resource) {
      return DataDisplay();
    }
    return undefined;
  };
  return (
    <>
      <SubNavigation
        goBack
        title={resource?.title}
        action={
          <Button
            leftIcon={<FontAwesomeIcon icon="edit" />}
            onClick={() => {
              navigate(
                `${editLink}/${id}`,
              );
            }}
          >
            Edit
          </Button>
        }
      />
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
export default Detail;
