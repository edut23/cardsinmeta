import { Formik } from "formik";
import React from "react";
import useRegister from "../../hooks/useRegister";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const { handleSubmitRegister } = useRegister();

    return(
        <div className="input">
            <h2>Sign Up</h2>
            <Formik
                initialValues={{name: '', email: '', password: '' }}
                validate={values => {
                    const errors = {name: '', email: '', password: ''};
                    if (!values.name)
                        errors.name = 'Required';
                    else if (!values.email)
                        errors.email = 'Required';
                    else if (!values.password)
                        errors.password = 'Required';
                    else if (values.password.length < 6)
                        errors.password = 'Minimum 6 characters'
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmitRegister(values);
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
                    <form className="form" onSubmit={(e) => { e.preventDefault(); handleSubmitRegister(values); }}>
                    <label>Name</label>
                    <input
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    <p style={{visibility: `${errors.name && touched.name && errors.name ? "visible" : "hidden"}`}}>{errors.name}</p>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <p style={{visibility: `${errors.email && touched.email && errors.email ? "visible" : "hidden"}`}}>{errors.email}</p>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <p style={{visibility: `${errors.password && touched.password && errors.password ? "visible" : "hidden"}`}}>{errors.password}</p>
                    <button type="submit" disabled={(values.email === '') || (values.password === '') || (errors.password !== '')}>
                        Submit
                    </button>
                    </form>
                )}
            </Formik>
            <p>Already have a account? <Link to="/">Login here!</Link></p>
        </div>
    )
}

export default Register;