import '@fontsource/exo-2';
import bankLogo from "../assets/images/dinerobankicon.png";

export default function Logo() {
    return (
        <div className="Logo">
            <h1 className="logo">Dinero<img src={bankLogo} alt="logo" className="imglogo"></img>Bank</h1>
        </div>
    )
}   