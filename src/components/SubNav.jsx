import {NavLink} from "react-router-dom";

const subClass = ({ isActive }) => (isActive ? "sub-link active" : "sub-link");

const SubNav = ({links}) => {
    return (
        <div className="subnav">
            {links.map( l => (
                <NavLink key={l.to} to={l.to} end={!!l.end} className={subClass}>
                    {l.label}
                </NavLink>
            ))}
        </div>
    );
};

export default SubNav;