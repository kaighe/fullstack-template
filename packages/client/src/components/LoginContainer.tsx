import "./LoginContainer.css"

type LoginContainerField = {
    text: string
    name: string
    type: React.HTMLInputTypeAttribute | undefined
}

type LoginContainerProps = {
    title: string
    submit: string
    error: undefined | string
    fields: LoginContainerField[]
    callback: undefined | ((e: React.FormEvent<HTMLFormElement>) => void)
}

function LoginContainer(props: LoginContainerProps){
    return <>
        <form id="form-container" onSubmit={props.callback}>
            <h1>{props.title}</h1>
            {props.error !== undefined ? <div id="login-error">{props.error}</div> : null}
            {props.fields.map(field => <input key={field.name} type={field.type} name={field.name} placeholder={field.text}/>)}
            <input type="submit" value={props.submit}/>
        </form>
    </>
}

export default LoginContainer