import Image from 'next/image'
import Link from 'next/link'

import { event } from '../../lib/gtag'

import styles from './index.module.scss'

export const FoodCard = ({ data }) => {
  return (
    <>
      {data.map((val) => {
        return (
          <div className={styles.priceCard} key={val.id}>
            <div className={styles.priceCardTexts}>
              <p className={styles.priceCardTextsName}>{val.name}</p>
              <p className={styles.priceCardTextsPrice}>
                ¥
                {Number.isInteger(val.price) ? val.price : val.price.toFixed(1)}
                {val.count > 1 && (
                  <span className={styles.priceCardTextsPriceNotice}>
                    /一個当たり
                  </span>
                )}
              </p>
            </div>

            <Link
              className={styles.priceCardLink}
              href={val.url}
              onClick={() => {
                event(`click_card_url_${val.id}`)
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              リンク
            </Link>
          </div>
        )
      })}
    </>
  )
}
