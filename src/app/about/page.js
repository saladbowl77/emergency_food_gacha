import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.scss'

export default function Result() {
  return (
    <main className={styles.main} style={{ width: 'calc(100% - 40px)' }}>
      <h2>このサイトについて</h2>
      <p>このサイトは大学の課題の一環で作成されたサイトです。</p>
      <p>
        そのため、掲載している内容や会社とは一切関係がありません。また、当サービスを利用されたことによって生ずる如何なる不都合や損害について責任は負いかねます。
      </p>
      <p>ここに掲載の内容は2023年1月11日現在の情報です。</p>
      <p>
        バグや動作不良につきましては、
        <Link href="https://saladbowl.work">さらだぼぉるお問い合わせ</Link>
        よりご連絡いただくか、
        <Link href="https://twitter.com/messages/compose?recipient_id=1266247450131435520">
          さらだぼぉるのTwitterDM
        </Link>
        までお寄せください
      </p>

      <Link
        className={styles.turnButton}
        style={{ display: 'block', margin: '10px auto' }}
        href="/"
      >
        トップに戻る
      </Link>
    </main>
  )
}
