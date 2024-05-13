import mongoose from 'mongoose';

export const dbConnect = async () => {
	try {
		const connectionsDB = await mongoose.connect(
			String(process.env.MONGODB_URI)
		);
		return connectionsDB;
	} catch (error) {
		console.error(error);
	}
};
