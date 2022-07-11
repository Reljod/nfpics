export type Nfpics = {
  version: '0.1.0'
  name: 'nfpics'
  instructions: [
    {
      name: 'mintNft'
      accounts: [
        {
          name: 'metadata'
          isMut: true
          isSigner: false
        },
        {
          name: 'masterEdition'
          isMut: true
          isSigner: false
        },
        {
          name: 'mint'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'mintAuthority'
          isMut: true
          isSigner: true
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenMetadataProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'metadataName'
          type: 'string'
        },
        {
          name: 'metadataSymbol'
          type: 'string'
        },
        {
          name: 'metadataUri'
          type: 'string'
        },
      ]
    },
  ]
}

export const IDL: Nfpics = {
  version: '0.1.0',
  name: 'nfpics',
  instructions: [
    {
      name: 'mintNft',
      accounts: [
        {
          name: 'metadata',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'masterEdition',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'mintAuthority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMetadataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'metadataName',
          type: 'string',
        },
        {
          name: 'metadataSymbol',
          type: 'string',
        },
        {
          name: 'metadataUri',
          type: 'string',
        },
      ],
    },
  ],
}
