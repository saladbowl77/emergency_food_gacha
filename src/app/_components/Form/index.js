import Image from 'next/image'

import styles from './index.module.scss'
import { useState } from 'react'

export const Form = ({ qaState, setQaState }) => {
  const [isSelected, setIsSelected] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleOptionChange = (event) => {
    setIsSelected(true)
  }

  return (
    <form
      className={styles.form}
      action="https://docs.google.com/forms/u/1/d/e/1FAIpQLSdqxJPPm2IS6FMIGEe0RTKMRO2TQV-fIuAdBRyEpd5sDmVIbg/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={() => {
        setQaState(true)
      }}
    >
      <div className={qaState ? styles.displayHidden : styles.displayShow}>
        <p className={styles.formTitle}>アンケートのお願い</p>
        <p className={styles.formAbout}>
          非常食に関するアンケートのご回答をお願いします。
        </p>
        {showError && (
          <p className={styles.formError}>
            送信する際は一つ以上選択してください。
          </p>
        )}
        <div className={styles.formBox}>
          <p className={styles.formBoxTitle}>1. 非常食の備蓄をしていますか?</p>
          <input
            id="input1_1"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="備蓄をして、定期的に確認をしている"
            onChange={handleOptionChange}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_1">
            <span>備蓄をして、定期的に確認をしている</span>
          </label>
          <input
            id="input1_2"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="備蓄を過去にしたが、定期的に確認をしていない"
            onChange={handleOptionChange}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_2">
            <span>備蓄を過去にしたが、定期的に確認をしていない</span>
          </label>
          <input
            id="input1_3"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.374370847"
            value="備蓄をしていない"
            onChange={handleOptionChange}
          />
          <label className={styles.formBoxLabel} htmlFor="input1_3">
            <span>備蓄をしていない</span>
          </label>
        </div>
        <div className={styles.formBox}>
          <p className={styles.formBoxTitle}>
            2. このアプリを使って非常食を買ってみたい、見直したいと思いましたか?
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
        <div className={styles.formBox}>
          <p className={styles.formBoxTitle}>
            3. このアプリで出てきた非常食を買いましたか?
          </p>
          <input
            id="input3_1"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.2132154400"
            value="はい"
            onChange={handleOptionChange}
          />
          <label className={styles.formBoxLabel} htmlFor="input3_1">
            <span>はい</span>
          </label>
          <input
            id="input3_2"
            className={styles.formBoxInputRadio}
            type="radio"
            name="entry.2132154400"
            value="いいえ"
            onChange={handleOptionChange}
          />
          <label className={styles.formBoxLabel} htmlFor="input3_2">
            <span>いいえ</span>
          </label>
        </div>

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
