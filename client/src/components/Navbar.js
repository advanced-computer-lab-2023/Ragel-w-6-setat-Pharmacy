import React from 'react';
import { Link, useHistory} from 'react-router-dom';
const Navbar = () => {
   // const history = useHistory()
    //const goBack = () => {
      //  history.goBack() // Navigate back to the previous page
  //  };

    return (
        <nav>
        <header>
            <div className="container">
                <Link to ="/">
                    <h1>Pharmaspace</h1>
                </Link>
                </div>

        </header>
        </nav>
    )
}

export default Navbar