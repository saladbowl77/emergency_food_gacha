'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'

import { Form } from '../../_components/Form'

export default function FormPage() {
  const [qaState, setQaState] = useState(false)

  return (
    <main className={styles.main}>
      <div className={styles.formWrap}>
        <Form qaState={qaState} setQaState={setQaState} formOnly />
      </div>
    </main>
  )
}
