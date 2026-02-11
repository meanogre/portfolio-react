import {NavLink} from "react-router-dom";

const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

const Nav = () => {
    return (
        <header className={'header'}>
            <div className="header-inner">
                <div className={'brand'}>Wayne Lassen</div>

                <nav className='nav'>
                    <NavLink to='/' end className={linkClass}>Home</NavLink>
                    <NavLink to='/about' end className={linkClass}>About</NavLink>
                    <NavLink to='/projects' end className={linkClass}>Projects</NavLink>
                    <NavLink to='/axioms' end className={linkClass}>Axioms</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Nav;