import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

import {Upload} from '../components/Upload'
import {Files} from '../components/Files'
const Profile = () => {
	const { user } = useContext(AuthContext);

	return (
		<div>
			<Upload />
			<Files />
		</div>
	);
};

export default Profile;
