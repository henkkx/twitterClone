import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, GridColumn, TransitionGroup, List } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostLoader from '../components/PostLoader';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import ScrollButton from '../components/ScrollButton';

const Home = () => {
	const { user } = useContext(AuthContext);

	const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);

	return (
		<Grid style={{ marginTop: 10 }} columns={3} doubling stackable>
			<Grid.Row className={'page-title'}>
				<h1>Recent posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<GridColumn>
						<PostForm />
					</GridColumn>
				)}
				{loading ? (
					<PostLoader />
				) : (
					<TransitionGroup animation="fly down" >
						{posts &&
							posts.map((post) => (
								<Grid.Column key={post.id} style={{ marginBottom: 30 }}>
									<PostCard post={post} />
								</Grid.Column>
							))}
					</TransitionGroup>
				)}
				<ScrollButton scrollStepInPx="50" delayInMs="16.66" />
			</Grid.Row>
		</Grid>
	);
};

export default Home;
