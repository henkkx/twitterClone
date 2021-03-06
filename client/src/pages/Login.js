import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { LOGIN_USER } from '../util/graphql';
import 'semantic-ui-css/semantic.min.css';

const Login = (props) => {
	const context = useContext(AuthContext);
	const [ errors, setErrors ] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: '',
		password: ''
	});

	const [ loginUser, { loading } ] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container" style={{ marginTop: 10 }}>
			<Form onSubmit={onSubmit} noValidate loading={loading}>
				<h1>Login</h1>
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
					label="Password"
					placeholder="Password"
					name="password"
					value={values.password}
					onChange={onChange}
					type="password"
					error={errors.password}
				/>

				<Button type="submit" primary>
					Login
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

export default Login;
