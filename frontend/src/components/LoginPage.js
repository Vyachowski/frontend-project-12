import {Field, Form, Formik} from "formik";

export default function LoginPage() {
  return (
    <div className="LoginForm">
      <h1>Sign In</h1>
      <Formik
        initialValues={{ nickname: "", password: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <Field name="name" type="text" />
          <Field name="password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
