import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import mongoClientPromise from './lib/mongoClientPromise';
import CredentialProvider from 'next-auth/providers/credentials';
import { userModel } from './models/userModel';
import { dbConnect } from './lib/mongo';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: MongoDBAdapter(mongoClientPromise, {
		databaseName: process.env.ENVIRONMENT,
	}),
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				if (credentials === null) return null;
				await dbConnect();
				try {
					const user = await userModel.findOne({
						email: credentials.email,
					});
					if (user) {
						const isMatch = user?.password === credentials.password;
						if (isMatch) {
							return user;
						} else {
							throw new Error('Invalid password');
						}
					} else {
						throw new Error('User not found');
					}
				} catch (error) {
					throw new Error(error);
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialProvider,
	],
});
