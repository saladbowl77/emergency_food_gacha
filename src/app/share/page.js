'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '../page.module.scss'

import { foods } from '../data'
import { event } from '../../lib/gtag'

export default function Result() {
  const searchParams = useSearchParams()
  const foodsId = searchParams.get('id')

  const [shownArr, setShownArr] = useState([])
  const [allPrice, setAllPrice] = useState(0)

  useEffect(() => {
    let nowFoodsArr = []
    let nowCost = 0

    const idArr = foodsId.split('-')

    for (const id of idArr) {
      let searched = false
      for (const food of foods) {
        if (food.id == id) {
          nowFoodsArr.push(food)
          nowCost += food.price
        }
      }
    }

    setShownArr(nowFoodsArr)
    setAllPrice(nowCost)
  }, [])
  return (
    <main className={styles.main}>
      <section>
        {shownArr.length == 0 && (
          <div className={styles.loading}>
            <Image
              className={styles.loadingImg}
              src="/backpack_gray.png"
              alt="読み込み中..."
              width={200}
              height={200}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                display: 'none',
              }}
            />
            <Image
              className={styles.loadingImg}
              src="/backpack_gray.png"
              alt="読み込み中..."
              width={200}
              height={200}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
              }}
            />
            <p className={styles.loadingText}>読み込み中...</p>
          </div>
        )}
        {shownArr.map((val) => {
          return (
            <div className={styles.priceCard} key={val.id}>
              <div className={styles.priceCardTexts}>
                <p className={styles.priceCardTextsName}>{val.name}</p>
                <p className={styles.priceCardTextsPrice}>
                  ¥{Number.isInteger(val.price) ? val.price : val.price}
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
                rel="noopener noreferrer"
                target="_blank"
              >
                リンク
              </Link>
            </div>
          )
        })}
        {shownArr.length != 0 && (
          <>
            <p className={styles.allPrice}>
              合計金額 :{' '}
              {Number.isInteger(allPrice) ? allPrice : allPrice.toFixed(1)}円
            </p>
            <p className={styles.kome}>※価格は2023年1月11日日時点</p>

            <div className={styles.buttons}>
              <Link
                href="/"
                onClick={() => {
                  event({
                    event: 'click_re_turnGacha',
                    event_category: 'click_event',
                  })
                }}
                className={styles.turnButton}
              >
                ガチャを回してみる!
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
