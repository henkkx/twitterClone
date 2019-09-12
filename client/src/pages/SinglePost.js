import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
	GridRow,
	Image,
	GridColumn,
	Grid,
	Card,
	CardContent,
	CardHeader,
	CardMeta,
	CardDescription,
	TransitionGroup
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { FETCH_POST_QUERY } from '../util/graphql';
import { CREATE_COMMENT_MUTATION } from '../util/graphql';
import PostLoader from '../components/PostLoader';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CommentButton from '../components/CommentButton';
import CommentCard from '../components/CommentCard';
import CommentForm from '../components/CommentForm';
import ScrollButton from '../components/ScrollButton';

const SinglePost = (props) => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const [ comment, setComment ] = useState('');

	const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId
		}
	});

	const [ createComment ] = useMutation(CREATE_COMMENT_MUTATION, {
		update() {
			setComment('');
		},
		variables: {
			postId,
			body: comment
		}
	});

	const handleCommentChange = (event) => setComment(event.target.value);

	const deletePostCallback = () => {
		props.history.push('/');
	};

	if (!getPost) return <PostLoader />;

	const { id, body, username, createdAt, comments, likes, likeCount, commentCount } = getPost;

	return (
		<Grid style={{ marginTop: 20 }}>
			<GridRow>
				<GridColumn width={2}>
					<Image
						as={Link}
						to={'/'}
						floated="right"
						size="small"
						src="https://react.semantic-ui.com/images/avatar/large/molly.png"
					/>
				</GridColumn>

				<Card fluid>
					<CardContent>
						<CardHeader>{username}</CardHeader>
						<CardMeta>{moment(createdAt).fromNow()} </CardMeta>
						<CardDescription>{body}</CardDescription>
					</CardContent>
					<hr />
					<CardContent extra>
						<LikeButton user={user} post={{ id, likeCount, likes }} />
						<CommentButton commentCount={commentCount} />
						{user &&
						user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
					</CardContent>
				</Card>
			</GridRow>
			<GridRow>
				{user && <CommentForm fluid onClick={createComment} comment={comment} onChange={handleCommentChange} />}
			</GridRow>
			<GridRow>
				<GridColumn>
					<TransitionGroup animation="fly down">
						{comments.map((comment) => (
							<CommentCard fluid postId={id} key={comment.id} comment={comment} user={user} />
						))}
					</TransitionGroup>
					<ScrollButton scrollStepInPx="50" delayInMs="16.66" />
				</GridColumn>
			</GridRow>
		</Grid>
	);
};

export default SinglePost;
