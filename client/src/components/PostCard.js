import React, { useContext } from 'react';
import { Card, Label, Image, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton'

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
				<Card.Description as={Link} to={`/posts/${id}`}>
					{body} 

				</Card.Description>
				
			</Card.Content>
		
			<Card.Content extra>

					<LikeButton post={{id, likes, likeCount}} user = {user} />
					<Button as={Link} to={`/posts/${id}`} labelPosition="right"  size="mini">
						<Button color="green" basic size="mini">
							<Icon name="comments" />
						</Button>
						<Label  basic color="green" pointing="left">
							{commentCount}
						</Label>
					</Button>
					{user && user.username === username && (
						<Button floated="right" style={{marginRight:-10}}color="red" size="mini" onClick={() => alert('delete')}>
							<Icon name="trash" style={{margin:0}}/>
						</Button>
					)}
					
					
			</Card.Content>
		</Card>
	);
};

export default PostCard;
