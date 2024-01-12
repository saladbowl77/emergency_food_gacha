import Image from 'next/image'
import Link from 'next/link'

import styles from './index.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.headerLogo}>
        <Image
          src="/logo.svg"
          alt="備えてますか?非常食ガチャ"
          width={300}
          height={200}
          style={{
            // width: '30px',
            height: '60px',
            objectFit: 'contain',
          }}
        />
      </Link>
    </header>
  )
}
