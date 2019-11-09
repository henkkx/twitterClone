import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useContext} from 'react';
import { AuthContext } from '../context/auth';


export const filesQuery = gql`
	query($image: String!) {
		getPost(image: $image)
	}
`;

export const Files = () => {

    const { user } = useContext(AuthContext);

	const { data, loading } = useQuery(filesQuery, {
        variables: {
            image: user.username
        }
    });

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<div>

			{ data ? data.files.map((x) => (
				<img style={{ width: 200 }} key={x} src={`http://localhost:4000/images/${x}`} alt={x} />
			)) : <p>hello</p> }
		</div>
	);
};
