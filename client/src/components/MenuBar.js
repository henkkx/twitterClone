import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const MenuBar = () => {
	const { user, logout } = useContext(AuthContext);
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'Home' : pathname.substr(1);

	const [ activeItem, setActiveItem ] = useState(path);

	const handleMenuClick = (e, { name }) => setActiveItem(name);

	const menubar = user ? ( //if logged in
		<Menu pointing secondary size="massive" color="blue">
			<Menu.Item name="Home" active={activeItem === 'Home'} onClick={handleMenuClick} as={Link} to="/" />
			<Menu.Item name="messages" active={activeItem === 'messages'} onClick={handleMenuClick} as={Link} to="/" />
			<Menu.Menu position="right">
				<Menu.Item name={user.username} />
				<Menu.Item name="Logout" onClick={() => logout()} />
			</Menu.Menu>
		</Menu>
	) : (
		//if not logged in
		<Menu pointing secondary size="massive" color="blue">
			<Menu.Item name="Home" active={activeItem === 'Home'} onClick={handleMenuClick} as={Link} to="/" />
			<Menu.Item name="messages" active={activeItem === 'messages'} onClick={handleMenuClick} as={Link} to="/" />
			<Menu.Menu position="right">
				<Menu.Item
					name="Login"
					active={activeItem === 'Login'}
					onClick={handleMenuClick}
					as={Link}
					to="/Login"
				/>
				<Menu.Item
					name="Register"
					active={activeItem === 'Register'}
					onClick={handleMenuClick}
					as={Link}
					to="/Register"
				/>
			</Menu.Menu>
		</Menu>
	);

	return menubar;
};

export default MenuBar;
