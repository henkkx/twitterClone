import React from 'react';
import { Card, Item, Label, Image, Icon, Button, ButtonGroup } from 'semantic-ui-react';
import moment from 'moment';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
	const handleLikePost = () => {
		alert('liked');
	};

	const handleCommentPost = () => {};

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
				<Card.Description as={Link} to={`/posts${id}`}>
					{body}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<ButtonGroup >
					<Button as="div" labelPosition="right">
						<Button color="blue" basic>
							<Icon name="heart" />
						</Button>
						<Label as="a" basic color="blue" pointing="left">
							{likeCount}
						</Label>
					</Button>
					<Button as="div" labelPosition="right">
						<Button color="green" basic>
							<Icon name="comments" />
						</Button>
						<Label as="a" basic color="green" pointing="left">
							{commentCount}
						</Label>
					</Button>
				</ButtonGroup>
			</Card.Content>
		</Card>
	);
};

export default PostCard;
