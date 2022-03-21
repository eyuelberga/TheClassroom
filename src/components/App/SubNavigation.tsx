import React from 'react';
import { Flex, Spacer, IconButton, Box, chakra } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { SubNavigationProps } from './props';

const SubNavigation: React.FC<SubNavigationProps> = ({
  title,
  goBack,
  description,
  action: Action,
}) => {
  const navigate = useNavigate();
  return (
    <Box mb={2}>
      <Flex py={2} align="baseline">
        {goBack && title && (
          <IconButton
            mx={1}
            colorScheme="gray"
            size="sm"
            variant="ghost"
            aria-label="create"
            onClick={() => {
              navigate(-1);
            }}
            icon={<FontAwesomeIcon icon="arrow-left" />}
          />
        )}
        {title && (
          <Box>
            <chakra.h2
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="shorter"
              color="gray.900"
            >
              <chakra.span>{title.split(' ')[0]}</chakra.span>
              <chakra.span color="gray.600">
                {` ${title.split(' ').slice(1).join(' ')}`}
              </chakra.span>
            </chakra.h2>
            <chakra.p color="gray.600">{description}</chakra.p>
          </Box>
        )}
        <Spacer />
        {Action}
      </Flex>
    </Box>
  );
};

export default SubNavigation;
