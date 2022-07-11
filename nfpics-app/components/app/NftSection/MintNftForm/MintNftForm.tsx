import { Wallet } from '@project-serum/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { mintOneNft } from 'lib/nft/mint'
import { useEffect, useState } from 'react'
import InputForm from './InputForm'

type Props = {}

const MintNftForm = (props: Props) => {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const [nftName, setNftName] = useState<string>('')
  const [nftSymbol, setNftSymbol] = useState<string>('')
  const [nftUrl, setNftUrl] = useState<string>('')
  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(false)

  useEffect(() => {
    setIsDisableSubmit(!(nftName && nftSymbol && nftUrl))
  }, [nftName, nftSymbol, nftUrl])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDisableSubmit(true)
    mintOneNft(connection, wallet as Wallet, nftName, nftSymbol, nftUrl)
      .then(() => {
        alert('NFT minted!')
      })
      .finally(() => {
        setIsDisableSubmit(false)
      })
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <InputForm
        meta={{ label: 'NFT Name', placeholder: 'NFT Name' }}
        value={nftName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setNftName(event.target.value)
        }
      />
      <InputForm
        meta={{ label: 'NFT Symbol', placeholder: 'NFT Symbol' }}
        value={nftName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setNftSymbol(event.target.value)
        }
      />
      <InputForm
        meta={{ label: 'NFT Url', placeholder: 'NFT Url' }}
        value={nftName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setNftUrl(event.target.value)
        }
      />
      <button
        type="submit"
        disabled={isDisableSubmit}
        className="px-2 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-800 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  )
}

export default MintNftForm
