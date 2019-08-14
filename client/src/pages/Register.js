import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks'
import 'semantic-ui-css/semantic.min.css';

const Register = (props) => {
	const [ errors, setErrors ] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
		email: '',
		password: '',
		confirmPassword: ''
    })

	const [ addUser, { loading } ] = useMutation(REGISTER_USER, {
		update(_, result) {
            props.history.push('/')
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function registerUser() {
        addUser()
    }

	return (
		<div className="form-container" style={{ marginTop: 10 }}>
			<Form onSubmit={onSubmit} noValidate loading={loading}>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Username"
					name="username"
					value={values.username}
					onChange={onChange}
					type="text"
                    error={errors.username}
				/>
				<Form.Input
					label="Email"
					placeholder="Email"
					name="email"
					value={values.email}
					onChange={onChange}
					type="email"
                    error={errors.email}
				/>
				<Form.Input
					label="Password"
					placeholder="Password"
					name="password"
					value={values.password}
					onChange={onChange}
					type="password"
                    error={errors.password}
				/>
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password"
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={onChange}
					type="password"
                    error={errors.confirmPassword}
				/>

				<Button type="submit" primary>
					Register
				</Button>
			</Form>

			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">{Object.values(errors).map((val) => <li key={val}>{val} </li>)}</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
