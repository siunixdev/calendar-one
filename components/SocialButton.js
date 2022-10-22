import Image from 'next/image'

function SocialButton({ onClick, icon, text }) {
  return (
    <button onClick={onClick} className='button-social'>
      <Image alt={text} src={icon} width={40} height={40} />
    </button>
  )
}

export default SocialButton