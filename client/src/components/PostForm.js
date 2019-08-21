import React from 'react';
import { Form, FormField, FormInput, Button, TextArea } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { CREATE_POST_MUTATION } from '../util/graphql';

const PostForm = () => {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: ''
	});

	const [ createPost, { error } ] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});

			data.getPosts = [ result.data.createPost, ...data.getPosts ];
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
			values.body = '';
		}
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<h2>Create a post:</h2>
				<FormField >
					<FormInput
						control={TextArea}
						rows={1}
						placeholder="hello world"
						name="body"
						onChange={onChange}
						value={values.body}
						error={error}
					/>
					<Button type="submit" color="blue">
						Submit
					</Button>
				</FormField>
			</Form>
			{error && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li>{error.graphQLErrors[0].message} </li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default PostForm;
