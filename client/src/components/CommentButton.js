import React from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CommentButton = ({commentCount, to}) => {
	
	if (to) {
		return (
			<Button as={Link} to={to} labelPosition="right" size="mini">
				<Button color="green" basic size="mini">
					<Icon name="comments" />
				</Button>
				<Label basic color="green" pointing="left">
					{commentCount}
				</Label>
			</Button>
		);
	} else {
		return (
			<Button as="div" labelPosition="right" size="mini">
				<Button color="green" basic size="mini">
					<Icon name="comments" />
				</Button>
				<Label basic color="green" pointing="left">
					{commentCount}
				</Label>
			</Button>
		);
	}
};

export default CommentButton;
