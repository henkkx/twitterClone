import React, { useState, useContext } from 'react';
import { Menu, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth'

const MenuBar = () => {

	const {user, logout} = useContext(AuthContext)
	const pathname = window.location.pathname;
	const path = pathname === '/' ? 'Home' : pathname.substr(1)

	const [ activeItem, setActiveItem ] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);


	const menubar = user ? (
		<Menu pointing secondary size="massive" color="blue">
				<Menu.Item name="Home" 
				active={activeItem === 'Home'}
				 onClick={handleItemClick} 
				 as={Link} to="/" 

				 />
				<Menu.Item
					name="messages"
					active={activeItem === 'messages'}
					onClick={handleItemClick}
					as={Link}
					to="/"
				/>
				<Menu.Menu position="right">
					<Menu.Item
						name={user.username}
					/>
					<Menu.Item
						name="Logout"
						onClick={() => logout()}

					/>
				</Menu.Menu>
			</Menu>
	) : (
		<Menu pointing secondary size="massive" color="blue">
				<Menu.Item name="Home" 
				active={activeItem === 'Home'}
				 onClick={handleItemClick} 
				 as={Link} to="/" 

				 />
				<Menu.Item
					name="messages"
					active={activeItem === 'messages'}
					onClick={handleItemClick}
					as={Link}
					to="/"
				/>
				<Menu.Menu position="right">
					<Menu.Item
						name="Login"
						active={activeItem === 'Login'}
						onClick={handleItemClick}
						as={Link}
						to="/Login"
					/>
					<Menu.Item
						name="Register"
						active={activeItem === 'Register'}
						onClick={handleItemClick}
						as={Link}
						to="/Register"
					/>
				</Menu.Menu>
			</Menu>
	)

	return menubar
};

export default MenuBar;
