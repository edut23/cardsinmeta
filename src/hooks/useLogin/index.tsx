import { loginApi } from "../../api/login"
import { useMyContext } from "../../context/myContext";
import { useNavigate } from "react-router-dom";

interface Login {
    email: string,
    password: string,
}

interface User{
    id: string,
    name: string,
    email: string
}

interface LoginResponse {
    token: string,
    user: User
}

const useLogin = () => {
    const {setToken, setUser} = useMyContext();
    const navigate = useNavigate();

    const isLoginResponse = (response: any): response is LoginResponse => {
        return (response as LoginResponse).token !== undefined;
    };

    const handleSubmitLogin = async(values: Login) => {
        try{
            const response: LoginResponse | Error = await loginApi(values.email, values.password);
            if(isLoginResponse(response)){
                setToken(response?.token);
                setUser(response?.user);
                console.log(response)
                navigate("/mycards");
                window.location.reload();
            }
        }catch(error){
            console.error(error)
            alert(error)
        }
    }

    return { handleSubmitLogin }
}

export default useLogin;