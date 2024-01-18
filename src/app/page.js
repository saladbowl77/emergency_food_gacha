'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'

import { FoodCard } from '../components/FoodCard'
import { AllPrice } from '../components/AllPrice'
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

  const [sortPopupShow, setSortPopupShow] = useState(false)

  const turnGacha = () => {
    event('click_turnGacha')
    const max = 1001
    let nowCost = 0
    let nowFoodsArr = []
    setShownArr([])
    setAllPrice(null)

    let idArr = []
    let foodArr = foods

    // もしそのまま食べれるがチェックされたらそれをソートする
    if (sortOnly) {
      foodArr = foodArr.filter((value) => {
        if (value.isOnly) return value
        return false
      })
    }

    // もしジャンルがソートされたらそれに限定する
    if (sortGenre != '全て') {
      foodArr = foodArr.filter((value) => {
        if (value.genre === sortGenre) return value
        return false
      })
    }

    console.log(sortAllergy)
    if (sortAllergy.length > 0) {
      foodArr = foodArr.filter((value) => {
        if (sortAllergy.some((str) => value.allergy.includes(str))) return false
        return value
      })
    }

    console.log(foodArr)

    while (max > nowCost) {
      let foodsArr = []
      for (const food of foodArr) {
        if (max - nowCost > food.price) {
          foodsArr.push(food)
        }
      }
      if (foodsArr.length == 0) break

      const pickUpFood = foodsArr[Math.floor(Math.random() * foodsArr.length)]
      idArr.push(pickUpFood.id)
      // for (let i = 0; i < foodArr.length; i++) {
      //   if (foodArr[i].id === pickUpFood.id) {
      //     const hoge = foodArr.splice(i, 1)
      //     console.log(hoge)
      //   }
      // }
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
      event('click_share_api_cant')
      alert('ご利用のブラウザでは共有できません。')
      return
    }

    try {
      await window.navigator.share({
        title: '非常食ガチャを回しました!',
        text: 'ランダムな非常食が出てくる非常食ガチャ。是非試してみてね!',
        url: shareUrl,
      })
      event('click_share_api')
      if (!qaState) {
        await setPopupShow(true)
      }
    } catch (e) {
      if (e.message == 'Abort due to cancellation of share.') {
        event('click_share_api_cancel')
      } else {
        event('click_share_api_error')
      }
      console.log(e)
    }
  }

  const [sortOnly, setSortOnly] = useState(false)
  const handleSortOnly = () => {
    event(`click_sort_only_${!sortOnly}`)
    setSortOnly(!sortOnly)
  }

  const genreOption = [
    '全て',
    'ご飯類',
    '麺類',
    '水',
    'お菓子',
    'パン類',
    'スープ類',
  ]
  const [sortGenre, setSortGenre] = useState('全て')
  const handleSortGenre = (e) => {
    event(`click_sort_option_${e.target.value}`)
    setSortGenre(e.target.value)
  }

  const genreAllergy = [
    'えび',
    'かに',
    'くるみ',
    '小麦',
    'そば',
    '卵',
    '乳',
    '落花生(ピーナッツ)',
    'アーモンド',
    'あわび',
    'いか',
    'いくら',
    'オレンジ',
    'カシューナッツ',
    'キウイフルーツ',
    '牛肉',
    'ごま',
    'さけ',
    'さば',
    '大豆',
    '鶏肉',
    'バナナ',
    '豚肉',
    'まつたけ',
    'もも',
    'やまいも',
    'りんご',
    'ゼラチン',
  ]
  const [sortAllergy, setSortAllergy] = useState([])
  const handleSortAllergy = (e) => {
    const options = e.target.options
    let value = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setSortAllergy(value)
    event('click_sort_allergy')
  }
  const handleSortAllergyCheckbox = (e) => {
    if (!sortAllergy.includes(e.target.value)) {
      setSortAllergy([...sortAllergy, e.target.value])
    } else {
      setSortAllergy(
        sortAllergy.filter((allergy, index) => allergy !== e.target.value),
      )
    }

    console.log(sortAllergy)
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window) setIsWebShare(navigator.share)
    const ua = navigator.userAgent
    if (
      ua.indexOf('iPhone') > 0 ||
      ua.indexOf('iPod') > 0 ||
      ua.indexOf('iPad') > 0 ||
      ua.indexOf('Android') > 0
    ) {
      setIsMobile(true)
    }
  }, [])

  return (
    <main className={styles.main}>
      <Image
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

          <FoodCard data={shownArr} />
          <AllPrice price={allPrice} />

          <div className={styles.buttons}>
            <div className={styles.buttonsShare}>
              <Link
                className={styles.buttonsShareTwitter}
                href={`https://twitter.com/intent/tweet?text=非常食ガチャを回しました!&hashtags=非常食ガチャ&related=saladbowl_dev&url=${shareUrl}`}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => {
                  event('click_share_twitter')
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
            <div className={styles.buttonsReturn}>
              <button
                onClick={() => {
                  event('click_re_turnGacha')
                  turnGacha()
                }}
                className={styles.turnButton}
              >
                もう一度回してみる
              </button>
              <p
                className={styles.sortPopupButton}
                onClick={() => {
                  setSortPopupShow(true)
                }}
              >
                アレルギーなどの条件を絞り込む
              </p>
            </div>
          </div>
          <div className={styles.formWrap}>
            <Form qaState={qaState} setQaState={setQaState} />
          </div>
        </section>
      )}
      {shownArr.length == 0 && (
        <section className={styles.beforeSection}>
          <p className={styles.beforeSectionText}>
            非常食を(大体)1000円分選んでくれるガチャ!
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
          <p
            className={styles.sortPopupButton}
            onClick={() => {
              setSortPopupShow(true)
            }}
          >
            アレルギーなどの条件を絞り込む
          </p>
        </section>
      )}

      {sortPopupShow && (
        <section className={styles.popUp}>
          <div className={styles.popUpWrap}>
            <div className={styles.popUpWrapHeader}>
              <Image
                className={styles.popUpWrapHeaderIcon}
                onClick={() => {
                  event('click_sort_popup_close')
                  setSortPopupShow(false)
                }}
                src="/icon/close.svg"
                alt="閉じるボタン"
                width={24}
                height={24}
                style={{
                  width: '24px',
                  height: '24px',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div className={styles.popUpWrapContent}>
              <div className={styles.gacyaSort}>
                <p className={styles.gacyaSortTitle}>条件の絞り込み</p>
                <div className={styles.gacyaSortOnly}>
                  <p className={styles.gacyaSortOnlyTitle}>
                    開けてそのまま食べれるもののみにする：
                  </p>
                  <input
                    className={styles.gacyaSortOnlyInput}
                    type="checkbox"
                    name="isOnly"
                    id="isOnly"
                    value="true"
                    onChange={(e) => {
                      handleSortOnly(e)
                    }}
                    checked={sortOnly}
                  />
                  <label htmlFor="isOnly"></label>
                </div>
                <div className={styles.gacyaSortGenre}>
                  <p className={styles.gacyaSortGenreTitle}>ジャンルを絞る</p>
                  <div className={styles.gacyaSortGenreSelect}>
                    <select value={sortGenre} onChange={handleSortGenre}>
                      {genreOption.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className={`${styles.gacyaSortAllergy} ${
                    isMobile && styles.gacyaSortAllergyMobile
                  }`}
                >
                  <p className={styles.gacyaSortAllergyTitle}>
                    アレルギーを除外する
                  </p>
                  {isMobile ? (
                    <div className={styles.gacyaSortAllergySelect}>
                      <select
                        multiple
                        value={sortAllergy}
                        onChange={(e) => {
                          handleSortAllergy(e)
                        }}
                      >
                        {genreAllergy.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className={styles.gacyaSortAllergyCheckbox}>
                      {genreAllergy.map((option, index) => (
                        <div className={styles.gacyaSortAllergyCheckboxWrap}>
                          <input
                            type="checkbox"
                            key={index}
                            value={option}
                            id={option}
                            name={option}
                            onChange={handleSortAllergyCheckbox}
                            checked={sortAllergy.includes(option)}
                          />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.popUpBackground}
            onClick={() => {
              event('click_sort_popup_close')
              setSortPopupShow(false)
            }}
          ></div>
        </section>
      )}
    </main>
  )
}
