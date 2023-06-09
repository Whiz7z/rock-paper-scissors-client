import React, { useState } from "react";
import styles from "./AuthPage.module.scss";
import { Formik, Form, Field } from "formik";
import { useUser, useRooms } from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SingInSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  nickname: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { user, login, register } = useUser((state) => state);
  const { setError } = useRooms((state) => state);

  const toggleAuthMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{isLoginMode ? "Login" : "Register"}</h1>
        <Formik
          initialValues={{
            nickname: "",
            password: "",
          }}
          validationSchema={SingInSchema}
          onSubmit={async (values, actions) => {
            console.log(values);

            if (isLoginMode) {
              await login(values.nickname, values.password).then(
                () => setError(null),
                navigate("/main")
              );
            } else {
              await register(values.nickname, values.password).then(
                () => setError(null),
                navigate("/main")
              );
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.input_container}>
                <label className={styles.label}>Nickname</label>

                <div className={styles.field_container}>
                  <Field name="nickname" className={`${styles.field}`} />
                  {errors.nickname && touched.nickname ? (
                    <div className={styles.error}>{errors.nickname}</div>
                  ) : null}
                </div>
              </div>

              <div className={styles.input_container}>
                <label className={styles.label}>Password</label>

                <div className={styles.field_container}>
                  <Field
                    name="password"
                    type={"password"}
                    className={`${styles.field}`}
                  />
                  {errors.password && touched.password ? (
                    <div className={styles.error}>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className={styles.btns_container}>
                <button type="submit" className={styles.submit}>
                  Login
                </button>
                <button
                  type="button"
                  className={styles.change_auth}
                  onClick={() => toggleAuthMode()}
                >
                  Change to {isLoginMode ? "sign up" : "login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthPage;
