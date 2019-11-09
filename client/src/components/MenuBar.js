import React, { useState, useContext } from 'react';
import { Menu, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import 'semantic-ui-css/semantic.min.css';

const MenuBar = () => {
	const { user, logout } = useContext(AuthContext);
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'Home' : pathname.substr(1);

	const [ activeItem, setActiveItem ] = useState(path);

	const handleMenuClick = (e, { name }) => setActiveItem(name);

	const menubar = user ? ( //if logged in
		<Sticky>
			<Menu style={{marginBottom:30}} inverted attached="top" pointing size="massive" secondary color="blue" marginBottom="20">
				<Menu.Item name="Home" active={activeItem === 'Home'} onClick={handleMenuClick} as={Link} to="/" />
				<Menu.Item
					name="messages"
					active={activeItem === 'messages'}
					onClick={handleMenuClick}
					as={Link}
					to="/"
				/>
				<Menu.Menu position="right">
					<Menu.Item name={user.username} as={Link} to="/profile" />
					<Menu.Item name="Logout" onClick={() => logout()} />
				</Menu.Menu>
			</Menu>
		</Sticky>
	) : (
		//if not logged in
		<Sticky>
			<Menu attached="top" pointing size="massive" inverted secondary color="blue">
				<Menu.Item name="Home" active={activeItem === 'Home'} onClick={handleMenuClick} as={Link} to="/" />
				<Menu.Item
					name="messages"
					active={activeItem === 'messages'}
					onClick={handleMenuClick}
					as={Link}
					to="/"
				/>
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
		</Sticky>
	);

	return menubar;
};

export default MenuBar;
