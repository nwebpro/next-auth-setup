'use client';
import { useRouter } from 'next/navigation';
import { login } from '../actions';

const LoginForm = () => {
	const router = useRouter();
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const formData = new FormData(e.currentTarget);
			const response = await login(formData);

			if (!!response.error) {
				console.error(response.error);
			} else {
				router.push('/');
			}
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
			></input>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
			></input>
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
