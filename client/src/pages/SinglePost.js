import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
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
	CardDescription
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { FETCH_POST_QUERY } from '../util/graphql';
import PostLoader from '../components/PostLoader';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CommentButton from '../components/CommentButton'

const SinglePost = (props) => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);

	const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId
		}
	});

	const deletePostCallback = () => {
		props.history.push('/');
	};

	if (!getPost) return <PostLoader />;

	const { id, body, username, createdAt, comments, likes, likeCount, commentCount } = getPost;

	return (
		<Grid style={{marginTop:20}}>
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
						<CommentButton commentCount={commentCount}/>
						{user &&
						user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
					</CardContent>
				</Card>
			</GridRow>
		</Grid>
	);
};

export default SinglePost;
