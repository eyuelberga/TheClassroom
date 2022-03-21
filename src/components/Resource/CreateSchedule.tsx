import React from "react";
import {
  Input,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateScheduleProps } from "./props";

const today = new Date();
today.setHours(0, 0, 0, 0);

const commonSchema = {
  date: Yup.date().required("Date is required").min(today),
  time: Yup.string().required("Time is required"),
};

const SessionEditor: React.FC<CreateScheduleProps> = ({
  date: initialDate,
  time: initialTime,
  onSave,
  isLoading,
}) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      validationSchema: Yup.object().shape({ ...commonSchema }),
      initialValues: {
        date: initialDate,
        time: initialTime,
      },
      onSubmit: ({ date, time }) => {
        const offset = -(new Date().getTimezoneOffset() / 60);
        if (date && time) {
          const timestamp = `${date} ${time}:00${
            offset > 0 ? "+" : "-"
          }${Math.abs(offset).toString().padStart(2, "0")}`;

          if (onSave) {
            onSave(timestamp);
          }
        }
      },
    });
  return (
    <Stack>
      <FormControl isInvalid={!!(errors.date && touched.date)}>
        <Input
          isDisabled={isLoading}
          id="date"
          placeholder="Date"
          type="date"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.date}
        />
        <FormErrorMessage>{errors.date}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!(errors.time && touched.time)}>
        <Input
          isDisabled={isLoading}
          id="time"
          placeholder="Time"
          type="time"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.time}
        />
        <FormErrorMessage>{errors.time}</FormErrorMessage>
      </FormControl>

      <Button
        isFullWidth
        id="save"
        colorScheme="gray"
        leftIcon={<FontAwesomeIcon icon={["far", "calendar-alt"]} />}
        onClick={() => {
          handleSubmit();
        }}
        isLoading={isLoading}
      >
        Schedule
      </Button>
    </Stack>
  );
};
export default SessionEditor;
