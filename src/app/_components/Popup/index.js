import Image from 'next/image'

import styles from './index.module.scss'

import { Form } from '../Form'
import { event } from '../../../lib/gtag'

export const Popup = ({ show, setShow, qaState, setQaState }) => {
  if (show) {
    return (
      <section className={styles.popUp}>
        <div className={styles.popUpWrap}>
          <div className={styles.popUpWrapHeader}>
            <Image
              className={styles.popUpWrapHeaderIcon}
              onClick={() => {
                event('click_popup_close')
                setShow(false)
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
            <Form qaState={qaState} setQaState={setQaState} />
          </div>
        </div>
        <div
          className={styles.popUpBackground}
          onClick={() => {
            event('click_popup_close')
            setShow(false)
          }}
        ></div>
      </section>
    )
  }
}
