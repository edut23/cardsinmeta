import { Formik } from "formik";
import useModal from "../../hooks/useModal";
import { useMyContext } from "../../context/myContext";

interface ModalProps{
    show: boolean | number
}

const Modal: React.FC<ModalProps> = (show) => {
    const {item, createItem, updateItem} = useModal(show.show);
    const {setModal} = useMyContext();

    return(
        <div className="modal" style={show.show ? {} :  {display: "none"}}>
            <div className="modalView">
                <h2>{typeof show.show === 'boolean'? "Create " : "Edit "}ToDo</h2>
                <Formik
                initialValues={item}
                validate={values => {
                    const errors = {name: '', description: '', imageUrl: '' };
                    if (!values.name)
                        errors.name = 'Required';
                    else if (!values.description)
                        errors.description = 'Required';
                    else if (!values.imageUrl)
                        errors.imageUrl = 'Required';
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
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
                    /* and other goodies */
                }) => (
                <>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="name"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    style={errors.name === 'Required' && touched.name ? {borderColor: "red"} : {}}
                                />
                            </td>
                            <td>
                                <input
                                    type="description"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    style={errors.description === 'Required' && touched.description ? {borderColor: "red"} : {}}
                                />
                            </td>
                            <td>
                                <input
                                    name="imageUrl"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.imageUrl}
                                    style={errors.imageUrl === 'Required' && touched.imageUrl ? {borderColor: "red"} : {}}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => setModal(false)}>Cancel</button>
                    <button 
                        disabled={(values.name === '') || (values.description === '') || (values.imageUrl === '')}
                    >
                            Save
                    </button>
                </div>
                </>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default Modal;