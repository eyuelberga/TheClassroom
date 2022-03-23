import React from 'react';
import {
  Input,
  Textarea,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateClassroomProps, Classroom } from './props';

const commonSchema = {
  title: Yup.string().required('You need a title for your classroom'),
};

const CreateClassroom: React.FC<CreateClassroomProps> = ({
  title: initialTitle,
  description: initialDescription,
  onSave,
  isLoading,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    validationSchema: Yup.object().shape({ ...commonSchema }),
    initialValues: {
      title: initialTitle|| "",
      description: initialDescription,
    },
    onSubmit: (payload: Classroom) => {
      if (payload.title) {
        if (onSave) {
          onSave(payload);
        }
      }
    },
  });

  return (
    <Stack>
      <FormControl isRequired isInvalid={!!(errors.title && touched.title)}>
        <Input
          isDisabled={isLoading}
          id="title"
          placeholder="Classroom Title"
          fontWeight="semibold"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
        />
        <FormErrorMessage>{errors.title}</FormErrorMessage>
        {!errors.title && (
          <FormHelperText>
            Pick a title that is clear to understand
          </FormHelperText>
        )}
      </FormControl>
      <FormControl isInvalid={!!(errors.description && touched.description)}>
        <Textarea
          isDisabled={isLoading}
          id="description"
          placeholder="Short description about the Classroom"
          resize="none"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />

        <FormErrorMessage>{errors.description}</FormErrorMessage>
      </FormControl>

      <Flex>
        <Spacer />
        <Button
          id="save"
          colorScheme="gray"
          leftIcon={<FontAwesomeIcon icon="save" />}
          onClick={() => {
            handleSubmit();
          }}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Save
        </Button>
      </Flex>
    </Stack>
  );
};
export default CreateClassroom;
