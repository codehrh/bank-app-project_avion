
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import '@fontsource/exo-2';

function User(params) {
    const { name, email, balance } = params.employee;
    const { houseNo, street, country } = params.address;
    return (
        <div className="user">
            <h1>
                Hello, {name}! <FontAwesomeIcon icon={faPencil} />
            </h1>
            <h4>Your email is {email}.</h4>
            <h4>Your total balance is {balance}.</h4>
            <h2>
                {houseNo} {street} {country}
            </h2>
        </div>
    );
}

export default User;