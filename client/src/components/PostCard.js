import React, { useContext } from 'react';
import { Card, Label, Image, Icon, Button, CardContent } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					as={Link}
					to={'/Register'}
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
			</Card.Content>
			<CardContent description={body}/>

			<Card.Content extra>
				<LikeButton post={{ id, likes, likeCount }} user={user} />
				<CommentButton as={Link} to={`/posts/${id}`} commentCount={commentCount} />
				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
