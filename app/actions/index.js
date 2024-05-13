'use server';

import { signIn, signOut } from '@/auth';

export const doSignOut = async () => {
	await signOut();
};

export const doSignIn = async () => {
	await signIn('google', {
		callbackUrl: `http://localhost:3000`,
	});
};

export const login = async (FormData) => {
	try {
		const response = await signIn('credentials', {
			email: FormData.get('email'),
			password: FormData.get('password'),
			redirect: false,
		});
		return response;
	} catch (e) {
		throw e;
	}
};
