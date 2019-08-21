import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Label } from 'semantic-ui-react';

import { LIKE_POST_MUTATION } from '../util/graphql';

const LikeButton = ({ post: { id, likes, likeCount }, user }) => {
	const [ liked, setLiked ] = useState(false);

	useEffect(
		() => {
			if (user && likes.find((like) => like.username === user.username)) {
				setLiked(true);
			} else setLiked(false);
		},
		[ user, likes ]
	);

	const [ likePost ] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id }
	});

	const likeBtn = user ? liked ? (
		//if liked
		<Button color="blue" size="mini">
			<Icon name="heart" />
		</Button>
	) : (
		//not liked
		<Button color="blue" basic size="mini">
			<Icon name="heart" />
		</Button>
	) : ( //not logged in
		<Button as={Link} to="/Login" color="blue" basic size="mini">
			<Icon name="heart" />
		</Button>
	);

	return (
		<Button as="div" labelPosition="right" size="mini" onClick={likePost}>
			{likeBtn}
			<Label basic color="blue" pointing="left">
				{likeCount}
			</Label>
		</Button>
	);
};

export default LikeButton;
