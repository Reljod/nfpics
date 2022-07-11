import MintNftForm from './MintNftForm'

type Props = {
  className: string
}

const NftSection = (props: Props) => {
  return (
    <div className={props.className}>
      <MintNftForm />
    </div>
  )
}

export default NftSection
