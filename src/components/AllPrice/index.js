import Image from 'next/image'
import Link from 'next/link'

import styles from './index.module.scss'
import { event } from '../../lib/gtag'

export const AllPrice = ({ price }) => {
  return (
    <>
      <p className={styles.allPrice}>
        合計金額 : {Number.isInteger(price) ? price : price.toFixed(1)}円
      </p>
      <p className={styles.kome}>
        ※価格は2023年1月11日日時点 /
        当サービスを利用されたことによって生ずる如何なる不都合や損害について責任は負いかねます。
      </p>
    </>
  )
}
