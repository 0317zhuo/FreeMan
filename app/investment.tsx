"use client";

import { useEffect, useState } from "react";
import { formatAmount } from "./landing-data";
import { EntryAction } from "./landing-interactions";
import styles from "./page.module.css";

const initialAmount = 15128642;

export default function Investment() {
  const [amount, setAmount] = useState(initialAmount);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const change = (Math.floor(Math.random() * 2400) + 1) * (Math.random() < .5 ? -1 : 1);
      setAmount((previous) => {
        const next = previous + change;
        return Math.abs(next - initialAmount) > 60000 ? previous - change : next;
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  const formatted = formatAmount(amount / 100);

  return <>
    <div className={styles.assetDisplay}>
      <div className={styles.assetNumber} aria-hidden="true"><span key={amount}>{formatted}</span></div>
      <div className={styles.assetCaption}><h2 id="assets-title" className={styles.assetTitle}>目前总资产已超过</h2><p>人民币 <span aria-hidden="true">/</span> CNY</p></div>
      <EntryAction entry="investment" className={styles.assetLink}>查看持仓 <span aria-hidden="true">↗</span></EntryAction>
      <p className={styles.srOnly}>目前总资产已超过{formatted} 元人民币，模拟数据。</p>
    </div>
  </>;
}
