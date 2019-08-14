import React from 'react';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

const PostLoader = () => {
	return (
		<Segment>
			<Dimmer active inverted>
				<Loader size="large">Loading posts</Loader>
			</Dimmer>

			<Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
		</Segment>
	);
};

export default PostLoader;
