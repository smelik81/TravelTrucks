import css from "./BookForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "Name should not contain numbers or special characters"
    )
    .min(2, "Name should be at least 2 characters")
    .max(20, "Name should be at most 20 characters")
    .required("Name is required"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email should contain only latin characters and end with @gmail.com"
    )
    .required("Email is required"),

  date: Yup.string().required("Booking date is required"),

  comment: Yup.string(),
});

const initialValues = {
  name: "",
  email: "",
  date: null,
  content: "",
};

const handleSubmit = (values, { resetForm }) => {
  console.log("Booking details:", values);

  toast.success("Booking successful!");
  resetForm();
};

const BookForm = () => {
  const [date, setDate] = useState(null);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className={css.bookingForm} noValidate>
            <div className={css.formTitle}>
              <h3 className={css.title}>Book your campervan now</h3>
              <p className={css.description}>
                Stay connected! We are always ready to help you.
              </p>
            </div>
            <div className={css.formWrapper}>
              <div className={css.inputField}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className={css.input}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inputField}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={css.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </div>

              {/*  <div className={css.inputField}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setFieldValue("date", date);
                  }}
                  placeholderText="Booking date*"
                  className={css.input}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className={css.error}
                />
              </div> */}

              <div className={css.inputField}>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  className={css.textarea}
                />
              </div>
            </div>
            <button type="submit" className={css.submitButton}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;
