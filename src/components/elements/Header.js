import React from "react";

import RMDBLogo from '../images/reactMovie_logo.png';
import TMDBLogo from '../images/tmdb_logo.svg';
import { StyledHeader, StyledRMDBLogo, StyledTMDBLogo } from '../styles/StyledHeader';


// implicit return, with arrow and ()
const Header = () => (
    <StyledHeader>
      <div className="header-content">
        <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo" />
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