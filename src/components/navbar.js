import companyLogo from "../assets/neofyicon.svg";
import companyName from "../assets/neofyname.svg";
import "./navbar.css";
const Navbar = () => {
    const menu = ["Trade", "Earn", "Support", "About"];
    return (
        <div className="navbar">
            <div className="company-info">
                <img style={{marginRight:"12px"}} alt="companyLogo" src={companyLogo} />
                <img alt="companyName" src={companyName} />
            </div>
            <div  className="menu-div" >
                <p className="menu-item-selected" >Trade</p>
                <p className="menu-item-default">Earn</p>
                <p className="menu-item-default">Support</p>
                <p className="menu-item-default">About</p>
            </div>
            <div>
                <button className="wallet-button">Connect wallet</button>
            </div>
        </div>
    );
};

export default Navbar;
