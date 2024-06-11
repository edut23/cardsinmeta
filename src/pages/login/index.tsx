import { Formik } from "formik";
import React from "react";
import useLogin from "../../hooks/useLogin"
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const { handleSubmitLogin } = useLogin();

    return(
        <div className="input">
            <h2>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {email: '', password: '' };
                    if (!values.email)
                        errors.email = 'Required';
                    else if (!values.password)
                        errors.password = 'Required';
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmitLogin(values);
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                }) => (
                    <form className="form" onSubmit={(e) => { e.preventDefault(); handleSubmitLogin(values); }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        style={errors.email  === 'Required' && touched.email ? {borderColor: "red"} : {}}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        style={errors.password  === 'Required' && touched.password ? {borderColor: "red"} : {}}
                    />
                    <button type="submit" disabled={(values.email === '') || (values.password === '')}>
                        Submit
                    </button>
                    </form>
                )}
            </Formik>
            <p>Don't have a account yet? <Link to="/register">Sign Up!</Link></p>
        </div>
    )
}

export default Login;