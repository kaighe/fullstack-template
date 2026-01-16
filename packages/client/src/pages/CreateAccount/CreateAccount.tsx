import { useState } from "react";
import LoginContainer from "../../components/LoginContainer"
import "./CreateAccount.css"
import { ErrorCode } from "shared/constants";

function CreateAccount() {
    let [error_message, set_error_message] = useState<undefined | string>(undefined);
    
    async function on_submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget).entries());

        let r = await fetch("/api/create_account", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

        if(r.status == 200){
            window.location.replace("/notes");
        }else if(r.status == 400){
            let {error} = await r.json();
            if(error == ErrorCode.BAD_EMAIL){
                set_error_message("Please enter a valid email.");
            }else if(error == ErrorCode.BAD_USERNAME){
                set_error_message("Username must be\n- 3 to 20 characters\n- Contain only letters, numbers, underscores, or dots");
            }else if(error == ErrorCode.BAD_PASSWORD){
                set_error_message("Password must\n- Be at least 8 characters long\n- Contain at least one letter\n- Contain at least one special character");
            }else if(error == ErrorCode.INUSE_EMAIL){
                set_error_message("Email is already in use.");
            }else if(error == ErrorCode.INUSE_USERNAME){
                set_error_message("Username is already in use.");
            }
        }else{
            set_error_message(`An error has occurred (${r.status})`);
        }
    }

    return <>
        <div id="centered">
            <LoginContainer
                title="Welcome"
                submit="Create Account"
                error={error_message}
                fields={[
                    {name: "username", type: "text", text: "Username"},
                    {name: "email", type: "email", text: "Email"},
                    {name: "password", type: "password", text: "Password"},
                    {name: "conf_password", type: "password", text: "Confirm Password"},
                ]}
                callback={on_submit}
            />
        </div>
    </>
}

export default CreateAccount