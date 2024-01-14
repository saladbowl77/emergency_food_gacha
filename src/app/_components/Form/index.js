import Image from 'next/image'

import styles from './index.module.scss'
import { useState } from 'react'

import { event } from '../../../lib/gtag'

export const Form = ({ qaState, setQaState, formOnly }) => {
  const [isSelected, setIsSelected] = useState(false)

  const [showLong, setShowLong] = useState(false)

  const handleOptionChange = (e) => {
    setIsSelected(true)
    if (!isSelected) {
      event('click_form_radio')
    }
  }
  const handleDidOption = (e) => {
    if (e.target.value == '備蓄をしていない') {
      setShowLong(false)
    } else {
      setShowLong(true)
    }
  }

  return (
    <form
      className={styles.form}
      action="https://docs.google.com/forms/u/1/d/e/1FAIpQLSdqxJPPm2IS6FMIGEe0RTKMRO2TQV-fIuAdBRyEpd5sDmVIbg/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={() => {
        event('click_form_submit')
        setQaState(true)
      }}
    >
      <div className={qaState ? styles.displayHidden : styles.displayShow}>
        <p className={styles.formTitle}>アンケートのお願い</p>
        <p className={styles.formAbout}>
          {typeof formOnly == 'undefined' && <>大学の課題のため、</>}
          非常食に関するアンケートにご協力お願いします。
          {typeof formOnly == 'undefined' ? <>(最大3問)</> : <>(最大2問)</>}
        </p>
        <div className={styles.formBox}>
          <p className={styles.formBoxTitle}>1. 非常食の備蓄をしていますか?</p>
          <input
            id="input1_1"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="以前から備蓄をして、定期的に確認をしている"
            onChange={(e) => {
              handleDidOption(e)
              handleOptionChange(e)
            }}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_1">
            <span>以前から備蓄をして、定期的に確認をしている</span>
          </label>
          <input
            id="input1_2"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="以前に備蓄をしたが、定期的に確認をしていない"
            onChange={(e) => {
              handleDidOption(e)
              handleOptionChange(e)
            }}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_2">
            <span>以前に備蓄をしたが、定期的に確認をしていない</span>
          </label>

          <input
            id="input1_3"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="最近の地震を見て、備蓄を始めた"
            onChange={(e) => {
              handleDidOption(e)
              handleOptionChange(e)
            }}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_3">
            <span>最近の地震を見て、備蓄を始めた</span>
          </label>
          <input
            id="input1_4"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="備蓄をしていない"
            onChange={(e) => {
              handleDidOption(e)
              handleOptionChange(e)
            }}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_4">
            <span>備蓄をしていない</span>
          </label>
        </div>
        {showLong && (
          <div className={styles.formBox}>
            <p className={styles.formBoxTitle}>
              1-2. 非常食は何日分用意していますか?
            </p>
            <input
              id="input1-2_1"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="1日"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_1">
              <span>1日</span>
            </label>
            <input
              id="input1-2_2"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="2日"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_2">
              <span>2日</span>
            </label>
            <input
              id="input1-2_3"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="3日"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_3">
              <span>3日</span>
            </label>
            <input
              id="input1-2_4"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="4,5日"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_4">
              <span>4,5日</span>
            </label>
            <input
              id="input1-2_5"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="6,7日"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_5">
              <span>6,7日</span>
            </label>
            <input
              id="input1-2_6"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="7日以上"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_6">
              <span>7日以上</span>
            </label>
            <input
              id="input1-2_7"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.834566207"
              value="覚えていない・わからない"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input1-2_7">
              <span>覚えていない・わからない</span>
            </label>
          </div>
        )}
        {typeof formOnly == 'undefined' && (
          <div className={styles.formBox}>
            <p className={styles.formBoxTitle}>
              2.
              このアプリを使って非常食を買ってみたい、見直したいと思いましたか?
            </p>
            <input
              id="input2_1"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.1719850445"
              value="とても思った"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input2_1">
              <span>とても思った</span>
            </label>
            <input
              id="input2_2"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.1719850445"
              value="思った"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input2_2">
              <span>思った</span>
            </label>
            <input
              id="input2_3"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.1719850445"
              value="思わなかった"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input2_3">
              <span>思わなかった</span>
            </label>
            <input
              id="input2_4"
              className={styles.formBoxInputRadio}
              type="radio"
              name="entry.1719850445"
              value="全く思わなかった"
              onChange={handleOptionChange}
            />
            <label className={styles.formBoxLabel} htmlFor="input2_4">
              <span>全く思わなかった</span>
            </label>
          </div>
        )}

        {isSelected ? (
          <button type="submit" className={styles.formSubmit}>
            送信
          </button>
        ) : (
          <p className={styles.formSubmitDisable}>送信</p>
        )}
      </div>
      <div className={qaState ? styles.displayShow : styles.displayHidden}>
        <p>アンケートのご回答ありがとうございました</p>
      </div>

      <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
      {/* <iframe name="hidden_iframe"></iframe> */}
    </form>
  )
}
