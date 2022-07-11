import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import NftSection from 'components/app/NftSection'

const IndexPage = () => {
  return (
    <div>
      <div className="fixed right-0 m-2">
        <WalletMultiButton />
      </div>
      <NftSection className="col-start-4 col-end-8 flex items-center justify-center" />
    </div>
  )
}

export default IndexPage
