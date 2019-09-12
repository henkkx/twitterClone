import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { DELETE_POST_MUTATION } from '../util/graphql';
import { FETCH_POSTS_QUERY } from '../util/graphql'
import { DELETE_COMMENT_MUTATION } from '../util/graphql'

const DeleteButton = ({ postId, commentId, callback }) => {
	const [ confirmOpen, setConfirmOpen ] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

	const [ deleteMutation ] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);
			if (!commentId){
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY
				})
				data.getPosts = data.getPosts.filter((p) => p.id !== postId)
				proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
			}
			if (callback) callback();
		},
		variables: {
			postId,
			commentId
		}
	});

	return (
		<div>
			<Button
				floated="right"
				style={ commentId ? {marginTop:0}: { marginTop:-30 }}
				color="red"
				size="mini"
				onClick={() => setConfirmOpen(true)}
			>
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>
			<Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deleteMutation} />
		</div>
	);
};

export default DeleteButton;
