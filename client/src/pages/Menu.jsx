import Cookies from "universal-cookie"

export function Menu(){
    let cookies = new Cookies()
    console.log(cookies.get('clientData'))

    return(
        <main>
            <h1>Main menu</h1>
        </main>
    )
}