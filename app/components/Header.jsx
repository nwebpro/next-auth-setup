import { auth } from '@/auth';
import Image from 'next/image';
import { doSignIn, doSignOut } from '../actions';

const Header = async () => {
	const session = await auth();

	return (
		<div>
			{session?.user ? (
				<div>
					<Image
						src={session?.user?.image}
						width={32}
						height={32}
						alt={session?.user?.name}
					/>
					<p>{session?.user?.name}</p>
					<form action={doSignOut}>
						<button type="submit">Sign Out</button>
					</form>
				</div>
			) : (
				<form action={doSignIn}>
					<button type="submit">Sign In with Google</button>
				</form>
			)}
		</div>
	);
};

export default Header;
