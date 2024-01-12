import Image from 'next/image'

import styles from './index.module.scss'

export const Form = () => {
  return (
    <div className={styles.form}>
      <p className={styles.formTitle}>アンケートのお願い</p>
      <p className={styles.formAbout}>
        非常食に関するアンケートのご回答をお願いします。
      </p>
      <div className={styles.formBox}>
        <p className={styles.formBoxTitle}>1. 非常食の備蓄をしていますか?</p>
        <input
          id="input1_1"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="備蓄をして、定期的に確認をしている"
        />
        <label className={styles.formBoxLabel} htmlFor="input1_1">
          <span>備蓄をして、定期的に確認をしている</span>
        </label>
        <input
          id="input1_2"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="備蓄を過去にしたが、定期的に確認をしていない"
        />
        <label className={styles.formBoxLabel} htmlFor="input1_2">
          <span>備蓄を過去にしたが、定期的に確認をしていない</span>
        </label>
        <input
          id="input1_3"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="備蓄をしていない"
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
          name="entry.入力"
          value="とても思った"
        />
        <label className={styles.formBoxLabel} htmlFor="input2_1">
          <span>とても思った</span>
        </label>
        <input
          id="input2_2"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="思った"
        />
        <label className={styles.formBoxLabel} htmlFor="input2_2">
          <span>思った</span>
        </label>
        <input
          id="input2_3"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="思わなかった"
        />
        <label className={styles.formBoxLabel} htmlFor="input2_3">
          <span>思わなかった</span>
        </label>
        <input
          id="input2_3"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="全く思わなかった"
        />
        <label className={styles.formBoxLabel} htmlFor="input2_3">
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
          name="entry.入力"
          value="とても思った"
        />
        <label className={styles.formBoxLabel} htmlFor="input3_1">
          <span>はい</span>
        </label>
        <input
          id="input3_2"
          className={styles.formBoxInputRadio}
          type="radio"
          name="entry.入力"
          value="思った"
        />
        <label className={styles.formBoxLabel} htmlFor="input3_2">
          <span>いいえ</span>
        </label>
      </div>
    </div>
  )
}
