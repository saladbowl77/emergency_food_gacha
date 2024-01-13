'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '../page.module.scss'

import { FoodCard } from '../../components/FoodCard'
import { AllPrice } from '../../components/AllPrice'
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
        <FoodCard data={shownArr} />
        {shownArr.length != 0 && (
          <>
            <AllPrice price={allPrice} />
            <div className={styles.buttons}>
              <Link
                href="/"
                onClick={() => {
                  event('click_re_turnGacha')
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
