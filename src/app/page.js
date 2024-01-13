'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'

import { Popup } from './_components/Popup'
import { Form } from './_components/Form'
import { foods } from './data'

export default function Home() {
  const [shownArr, setShownArr] = useState(false)
  const [allPrice, setAllPrice] = useState(false)
  const [isWebShare, setIsWebShare] = useState(false)
  const [lodingTimer, setLodingTimer] = useState(false)
  const [popupShow, setPopupShow] = useState(false)
  const [qaState, setQaState] = useState(false)

  const turnGacha = () => {
    console.log(foods)
    const max = 1000
    let nowCost = 0
    let nowFoodsArr = []
    setShownArr([])
    setAllPrice(null)

    while (max > nowCost) {
      let foodsArr = []
      for (const food of foods) {
        if (max - nowCost > food.price) {
          foodsArr.push(food)
        }
      }

      if (foodsArr.length == 0) break

      const pickUpFood = foodsArr[Math.floor(Math.random() * foodsArr.length)]
      nowFoodsArr.push(pickUpFood)
      nowCost += pickUpFood.price
    }

    setLodingTimer(true)
    setTimeout(
      () => {
        setLodingTimer(false)
      },
      Math.random() * 1000 + 1000,
    )

    setShownArr(nowFoodsArr)
    setAllPrice(nowCost)
  }

  const share = async () => {
    if (!window.navigator.share) {
      alert('ご利用のブラウザでは共有できません。')
      return
    }

    try {
      await window.navigator.share({
        title: 'Share API で共有！',
        text: 'ご覧の通り、お手軽にSNSにリンクを供することができます。',
        url: 'https://example.com/hogehoge',
      })
      alert('共有が完了しました。')
      if (!qaState) {
        await setPopupShow(true)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    if (window) setIsWebShare(navigator.share)
  }, [])

  return (
    <main className={styles.main}>
      {lodingTimer && (
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
          <p className={styles.loadingText}>ガチャ引き中...</p>
        </div>
      )}
      {shownArr != [] && !lodingTimer && (
        <section>
          <Popup
            show={popupShow}
            setShow={setPopupShow}
            qaState={qaState}
            setQaState={setQaState}
          />
          {shownArr.map((val) => {
            return (
              <div className={styles.priceCard} key={val.id}>
                <div className={styles.priceCardTexts}>
                  <p className={styles.priceCardTextsName}>{val.name}</p>
                  <p className={styles.priceCardTextsPrice}>
                    ¥
                    {Number.isInteger(val.price)
                      ? val.price
                      : val.price.toFixed(1)}
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
          <p className={styles.allPrice}>
            合計金額 :{' '}
            {Number.isInteger(allPrice) ? allPrice : allPrice.toFixed(1)}円
          </p>
          <p className={styles.kome}>※価格は2023年1月11日日時点</p>

          <div className={styles.buttons}>
            <div className={styles.buttonsShare}>
              <Link
                className={styles.buttonsShareTwitter}
                href={`https://twitter.com/intent/tweet?text=非常食ガチャを回しました!&hashtags=非常食ガチャ&related=saladbowl_dev&url=https://hijousyoku.rkwt.me/result?id=0-2-3-4`}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => {
                  if (!qaState) setPopupShow(true)
                }}
              >
                <div className={styles.buttonsShareTwitterImage}>
                  <Image
                    src="/icon/xLogo.svg"
                    alt="xのロゴ"
                    width={30}
                    height={30}
                    style={{
                      width: '30px',
                      height: '30px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <p className={styles.buttonsShareTwitterText}>
                  結果をX(旧Twitter)でシェア
                </p>
              </Link>
              {isWebShare && (
                <button
                  className={styles.buttonsShareOther}
                  onClick={() => {
                    share()
                  }}
                >
                  SNSでシェアする
                </button>
              )}
            </div>
            <button
              onClick={() => {
                turnGacha()
              }}
              className={styles.turnButton}
            >
              もう一度回してみる
            </button>
          </div>
          <div className={styles.formWrap}>
            <Form qaState={qaState} setQaState={setQaState} />
          </div>
        </section>
      )}
      {shownArr == [] && (
        <section className={styles.beforeSection}>
          <p className={styles.beforeSectionText}>
            非常食を1000円分選んでくれるガチャ!
          </p>
          <p className={styles.beforeSectionText}>
            意外とちょっと常備して忘れがちな非常食。こんな非常食もあるんだという発見と備蓄のきっかけになれば幸いです。
          </p>
          <button
            onClick={() => {
              turnGacha()
            }}
            className={styles.turnButton}
          >
            {shownArr != [] && 'もう一度'}回してみる
          </button>
        </section>
      )}
    </main>
  )
}
