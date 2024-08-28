import '../css/components/IndexHeader.css'

export function IndexHeader({nombre, apellido, imgLink}) {
    return (
        <main className="indexHeader-container">
            <section className="indexHeader-profile-container">
                <div className="indexHeader-imgContainer">
                    <img className="indexHeader-profile-img" src={imgLink} alt="foto de perfil" />
                </div>
                <div className="indexHeader-welcome">
                    <p>Hi, {nombre} {apellido}!</p>
                    <b>Let's watch movie together!</b>
                </div>
                <div className="indexHeader-notifications">
                    <img className="img-notifications" src="campana.svg" alt="img campana" />
                </div>
            </section>
        </main>
    )
}