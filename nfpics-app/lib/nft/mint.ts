import * as anchor from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

import nfpics from '/Users/reljodoreta/Developer/Repositories/Projects/nfpics/target/idl/nfpics.json'

type PubKey = anchor.web3.PublicKey

const TOKEN_METADATA_PROGRAM_KEY = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
  TOKEN_METADATA_PROGRAM_KEY,
)
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PubKey =
  new anchor.web3.PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

const PROGRAM_ID = new anchor.web3.PublicKey(
  '33dzo1WrFP7udfrHBxkEGDzrTFj3F2w1cMePKjNtsWnr',
)
const opts = {
  preflightCommitment: 'recent',
}

const generateKeyPair = (): anchor.web3.Keypair => {
  return anchor.web3.Keypair.generate()
}

const deriveAssociateTokenAddress = async (
  mintPubKey: PubKey,
  ownerPubKey: PubKey,
): Promise<PubKey> => {
  return await anchor.utils.token.associatedAddress({
    mint: mintPubKey,
    owner: ownerPubKey,
  })
}

const deriveMetadataAddress = async (mintPubKey: PubKey): Promise<PubKey> => {
  const programAddress = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintPubKey.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID,
  )
  return programAddress[0]
}

const deriveMasterEditionAddress = async (
  mintPubKey: PubKey,
): Promise<PubKey> => {
  const programAddress = await anchor.web3.PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mintPubKey.toBuffer(),
      Buffer.from('edition'),
    ],
    TOKEN_METADATA_PROGRAM_ID,
  )
  return programAddress[0]
}

const mintOneNft = async (
  connection: anchor.web3.Connection,
  wallet: anchor.Wallet,
  title: string,
  symbol: string,
  uri: string,
) => {
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment as anchor.web3.ConfirmOptions,
  )
  anchor.setProvider(provider)

  const program = new anchor.Program(nfpics as anchor.Idl, PROGRAM_ID, provider)

  const mintKeyPair = generateKeyPair()
  const associatedAddressPubKey = await deriveAssociateTokenAddress(
    wallet.publicKey,
    mintKeyPair.publicKey,
  )
  const metadataAddressPubKey = await deriveMetadataAddress(
    mintKeyPair.publicKey,
  )
  const masterEditionAddressPubKey = await deriveMasterEditionAddress(
    mintKeyPair.publicKey,
  )

  await program.methods
    .mintNft(title, symbol, uri)
    .accounts({
      metadata: metadataAddressPubKey,
      masterEdition: masterEditionAddressPubKey,
      mint: mintKeyPair.publicKey,
      tokenAccount: associatedAddressPubKey,
      mintAuthority: wallet.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
    })
    .signers([mintKeyPair])
    .rpc()
}

export { mintOneNft, generateKeyPair }
