import { useState } from "react";
import LoginContainer from "../../components/LoginContainer"
import "./Login.css"

function Login() {
    let [error_message, set_error_message] = useState<undefined | string>(undefined);
    
    async function on_submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget).entries());

        let r = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        if(r.status == 200){
            window.location.replace("/notes");
        }else if(r.status == 400){
            set_error_message("Username or passoword is incorrect");
        }else{
            set_error_message(`An error has occurred (${r.status})`);
        }
    }

    return <>
        <div id="centered">
            <LoginContainer
                title="Welcome Back"
                submit="Login"
                error={error_message}
                fields={[
                    {name: "username", type: "text", text: "Username"},
                    {name: "password", type: "password", text: "Password"},
                ]}
                callback={on_submit}
            />
        </div>
    </>
}

export default Login