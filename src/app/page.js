'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'

import { Popup } from './_components/Popup'
import { Form } from './_components/Form'
import { foods } from './data'

import { event } from '../lib/gtag'

export default function Home() {
  const [shownArr, setShownArr] = useState([])
  const [allPrice, setAllPrice] = useState(0)

  const [shareUrl, setShareUrl] = useState('')

  const [isWebShare, setIsWebShare] = useState(false)
  const [lodingTimer, setLodingTimer] = useState(false)
  const [popupShow, setPopupShow] = useState(false)
  const [qaState, setQaState] = useState(false)

  const turnGacha = () => {
    event({
      event: 'click_turnGacha',
      event_category: 'click_event',
    })
    const max = 1000
    let nowCost = 0
    let nowFoodsArr = []
    setShownArr([])
    setAllPrice(null)

    let idArr = []

    while (max > nowCost) {
      let foodsArr = []
      for (const food of foods) {
        if (max - nowCost > food.price) {
          foodsArr.push(food)
        }
      }

      if (foodsArr.length == 0) break

      const pickUpFood = foodsArr[Math.floor(Math.random() * foodsArr.length)]
      idArr.push(pickUpFood.id)
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
    setShareUrl(
      `https://emergency-food-gacha.rkwt.me/share?id=${idArr.join('-')}`,
    )
  }

  const share = async () => {
    if (!window.navigator.share) {
      event({
        event: 'click_share_api_cant',
        event_category: 'click_event',
      })
      alert('ご利用のブラウザでは共有できません。')
      return
    }

    try {
      await window.navigator.share({
        title: '非常食ガチャを回しました!',
        text: 'ランダムな非常食が出てくる非常食ガチャ。是非試してみてね!',
        url: shareUrl,
      })
      event({
        event: 'click_share_api',
        event_category: 'click_event',
      })
      if (!qaState) {
        await setPopupShow(true)
      }
    } catch (e) {
      if (e.message == 'Abort due to cancellation of share.') {
        event({
          event: 'click_share_api_cancel',
          event_category: 'click_event',
        })
      } else {
        event({
          event: 'click_share_api_error',
          event_category: 'click_event',
        })
      }
      console.log(e)
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
      {shownArr.length != 0 && !lodingTimer && (
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
                href={`https://twitter.com/intent/tweet?text=非常食ガチャを回しました!&hashtags=非常食ガチャ&related=saladbowl_dev&url=${shareUrl}`}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => {
                  event({
                    event: 'click_share_twitter',
                    event_category: 'click_event',
                  })
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
                event({
                  event: 'click_re_turnGacha',
                  event_category: 'click_event',
                })
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
      {shownArr.length == 0 && (
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
            {shownArr.length != 0 && 'もう一度'}回してみる
          </button>
        </section>
      )}
    </main>
  )
}
