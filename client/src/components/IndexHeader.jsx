import Cookies from "universal-cookie";
import '../css/components/IndexHeader.css'

export function IndexHeader() {
    const cookies = new Cookies
    const { nombre, apellido, img } = cookies.get('clientData')

    return (
        <main className="indexHeader-container">
            <section className="indexHeader-profile-container">
                <div className="indexHeader-imgContainer">
                    <img className="indexHeader-profile-img" src={img} alt="foto de perfil" />
                </div>
                <div className="indexHeader-welcome">
                    <p>Hi, {nombre} {apellido}!</p>
                    <b>Let's watch movie together!</b>
                </div>
                <div className="indexHeader-notifications">
                    <img className="img-notifications" src="campana.png" alt="" />
                </div>
            </section>
        </main>
    )
}