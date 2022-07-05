import * as anchor from '@project-serum/anchor';

import type { Nfpics } from '../../../../../target/types/nfpics';

type PubKey = anchor.web3.PublicKey;

const TOKEN_METADATA_PROGRAM_KEY = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(TOKEN_METADATA_PROGRAM_KEY);

const generateKeyPair = (): anchor.web3.Keypair => {
	return anchor.web3.Keypair.generate();
};

const deriveAssociateTokenAddress = async (
	mintPubKey: PubKey,
	ownerPubKey: PubKey
): Promise<PubKey> => {
	return await anchor.utils.token.associatedAddress({
		mint: mintPubKey,
		owner: ownerPubKey
	});
};

const deriveMetadataAddress = async (mintPubKey: PubKey): Promise<PubKey> => {
	const programAddress = await anchor.web3.PublicKey.findProgramAddress(
		[Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mintPubKey.toBuffer()],
		TOKEN_METADATA_PROGRAM_ID
	);
	return programAddress[0];
};

const deriveMasterEditionAddress = async (mintPubKey: PubKey): Promise<PubKey> => {
	const programAddress = await anchor.web3.PublicKey.findProgramAddress(
		[
			Buffer.from('metadata'),
			TOKEN_METADATA_PROGRAM_ID.toBuffer(),
			mintPubKey.toBuffer(),
			Buffer.from('edition')
		],
		TOKEN_METADATA_PROGRAM_ID
	);
	return programAddress[0];
};

const mintNft = async (title: string, symbol: string, uri: string) => {
	const provider = anchor.AnchorProvider.env();
	const wallet = provider.wallet as anchor.Wallet;
	anchor.setProvider(provider);

	const program = anchor.workspace.Nfpics as anchor.Program<Nfpics>;

	const mintKeyPair = generateKeyPair();
	const associatedAddressPubKey = await deriveAssociateTokenAddress(
		wallet.publicKey,
		mintKeyPair.publicKey
	);
	const metadataAddressPubKey = await deriveMetadataAddress(mintKeyPair.publicKey);
	const masterEditionAddressPubKey = await deriveMasterEditionAddress(mintKeyPair.publicKey);

	await program.methods
		.mintNft(title, symbol, uri)
		.accounts({
			masterEdition: masterEditionAddressPubKey,
			metadata: metadataAddressPubKey,
			mint: mintKeyPair.publicKey,
			tokenAccount: associatedAddressPubKey,
			mintAuthority: wallet.publicKey,
			tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID
		})
		.signers([mintKeyPair])
		.rpc();
};

export { mintNft, generateKeyPair };
