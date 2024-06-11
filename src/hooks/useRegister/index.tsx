import { registerApi } from "../../api/register/index";

interface Login {
    name: string,
    email: string,
    password: string,
}

const useRegister = () => {
    const handleSubmitRegister = async(values: Login) => {
        try{
            const response = await registerApi(values.name, values.email, values.password);
            if(typeof response === "object")
                alert("User created");
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    return { handleSubmitRegister }
}

export default useRegister;