import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { DELETE_POST_MUTATION } from '../util/graphql';
import { FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ({ postId, callback }) => {
	const [ confirmOpen, setConfirmOpen ] = useState(false);

	const [ deletePost ] = useMutation(DELETE_POST_MUTATION, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			})
			data.getPosts = data.getPosts.filter((p) => p.id !== postId)
			proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
			if (callback) callback();
		},
		variables: {
			postId
		}
	});

	return (
		<div>
			<Button
				floated="right"
				style={{ marginTop:-30 }}
				color="red"
				size="mini"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>
			<Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
		</div>
	);
};

export default DeleteButton;