import React from "react";
import { Link } from "@reach/router";

import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';
import { StyledHeader, StyledRMDBLogo, StyledTMDBLogo } from '../styles/StyledHeader';


// implicit return, with arrow and ()
const Header = () => (
    <StyledHeader>
      <div className="header-content">
        <Link to="/">
          <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo" />
        </Link>
        <StyledTMDBLogo src={TMDBLogo} alt="tmdb-logo" />
      </div>
    </StyledHeader>
)
    
// equivalent to:
// const Header = () => {
//     return <div>Header</div>
// }
// functioner Header () {}

export default Header;