'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'

import { Popup } from './_components/Popup'
import { Form } from './_components/Form'

export default function Home() {
  const [shownArr, setShownArr] = useState(false)
  const [allPrice, setAllPrice] = useState(false)
  const [isWebShare, setIsWebShare] = useState(false)
  const [lodingTimer, setLodingTimer] = useState(false)
  const [popupShow, setPopupShow] = useState(false)
  const [qaState, setQaState] = useState(false)

  const foods = [
    {
      id: 0,
      name: 'hoge10',
      price: 100,
      url: 'https://example.com',
    },
    {
      id: 1,
      name: 'hoge11',
      price: 110,
      url: 'https://example.com',
    },
    {
      id: 2,
      name: 'hoge12',
      price: 120,
      url: 'https://example.com',
    },
    {
      id: 3,
      name: 'hoge13',
      price: 130,
      url: 'https://example.com',
    },
    {
      id: 4,
      name: 'hoge14',
      price: 140,
      url: 'https://example.com',
    },
    {
      id: 5,
      name: 'hoge15',
      price: 150,
      url: 'https://example.com',
    },
    {
      id: 6,
      name: 'hoge16',
      price: 160,
      url: 'https://example.com',
    },
    {
      id: 7,
      name: 'hoge17',
      price: 170,
      url: 'https://example.com',
    },
    {
      id: 8,
      name: 'hoge',
      price: 180,
      url: 'https://example.com',
    },
    {
      id: 9,
      name: 'hoge',
      price: 190,
      url: 'https://example.com',
    },
    {
      id: 10,
      name: 'hoge',
      price: 200,
      url: 'https://example.com',
    },
    {
      id: 11,
      name: 'hoge',
      price: 210,
      url: 'https://example.com',
    },
    {
      id: 12,
      name: 'hoge',
      price: 220,
      url: 'https://example.com',
    },
    {
      id: 13,
      name: 'hoge',
      price: 230,
      url: 'https://example.com',
    },
    {
      id: 14,
      name: 'hoge',
      price: 240,
      url: 'https://example.com',
    },
    {
      id: 15,
      name: 'hoge',
      price: 250,
      url: 'https://example.com',
    },
    {
      id: 16,
      name: 'hoge',
      price: 260,
      url: 'https://example.com',
    },
    {
      id: 17,
      name: 'hoge',
      price: 270,
      url: 'https://example.com',
    },
    {
      id: 18,
      name: 'hoge',
      price: 280,
      url: 'https://example.com',
    },
  ]

  const turnGacha = async () => {
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
              <div className={styles.priceCard}>
                <div className={styles.priceCardTexts}>
                  <p className={styles.priceCardTextsName}>{val.name}</p>
                  <p className={styles.priceCardTextsPrice}>¥{val.price}</p>
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
          <p className={styles.allPrice}>合計金額 : {allPrice}円</p>
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
