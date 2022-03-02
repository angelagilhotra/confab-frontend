import {useState} from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerField = ({ ...props }) => {
  const [startDate, setStartDate] = useState(props.value ?? new Date());
  const { setFieldValue } = useFormikContext();
  // @ts-ignore
  const [field] = useField(props);
  return (
    <>
    <DatePicker
      {...field}
      {...props}
      selected={startDate}
      onChange={val => {
        setFieldValue(field.name, val);
        setStartDate(val);
      }}
      shouldCloseOnSelect
      showTimeSelect={true}
      placeholderText="date & time"
      dateFormat="d LLL, h:mm aa"
      className={`
        rounded-lg focus:border-primary focus:ring-primary
        font-primary
      `}
      minDate={new Date()}
      todayButton="Today"
    />
    </>
  );
};