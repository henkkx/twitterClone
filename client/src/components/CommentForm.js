import React from 'react';
import { Card, CardContent, Form, TextArea } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

const CommentForm = ({ onClick, onChange, comment }) => {
	return (
		<Card fluid>
			<CardContent>
				<p>Post a comment</p>
				<Form>
					<div className="ui action input field">
						<input 
							type="text"
							placeholder="Join the discussion..."
							name="comment"
							value={comment}
							onChange={onChange}
						/>
                        <button type="submit" className="ui button blue" disabled={comment.trim()===''} onClick={onClick}>
                            submit
                        </button>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
};

export default CommentForm;
