"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { formatAmount, markets, marketValue, portfolioPercent, totalCny, valuation } from "./landing-data";
import { EntryAction } from "./landing-interactions";
import styles from "./page.module.css";

export default function Investment() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const market = markets[selected];
  const rate = valuation.rates[market.currency];
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % markets.length;
    else if (event.key === "ArrowLeft") next = (index + markets.length - 1) % markets.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = markets.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  };
  return <div className={styles.portfolio}>
    <div className={styles.portfolioSummary}>
      <div><p className={styles.smallLabel}>TOTAL PORTFOLIO / 全部示例持仓</p><p className={styles.totalAmount}><span>¥</span>{formatAmount(totalCny)}<small>CNY</small></p><p className={styles.note}>四个市场，统一按人民币市值计算。</p></div>
      <div className={styles.marketBreakdown}>{markets.map((item, index) => <div key={item.id}><span><i className={styles[`marketColor${index}`]} />{item.name}</span><strong>{portfolioPercent(marketValue(item) * valuation.rates[item.currency])}</strong></div>)}</div>
    </div>
    <div className={styles.allocationBar} aria-label="四市场持仓占比">{markets.map((item, index) => <span key={item.id} className={styles[`marketColor${index}`]} style={{ width: portfolioPercent(marketValue(item) * valuation.rates[item.currency]) }} />)}</div>
    <div role="tablist" aria-label="选择持仓市场" className={styles.marketTabs}>{markets.map((item, index) => <button key={item.id} ref={(element) => { tabs.current[index] = element; }} role="tab" id={`tab-${item.id}`} aria-selected={selected === index} aria-controls={`panel-${item.id}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => onKey(event, index)}><span aria-hidden="true">{selected === index ? "[●]" : "[ ]"}</span>{item.name}</button>)}</div>
    {markets.filter((item) => item.id !== market.id).map((item) => <div key={item.id} role="tabpanel" id={`panel-${item.id}`} aria-labelledby={`tab-${item.id}`} hidden />)}
    <div role="tabpanel" id={`panel-${market.id}`} aria-labelledby={`tab-${market.id}`} tabIndex={0} className={styles.holdingsPanel} key={market.id}>
      <table className={styles.holdings}><caption className={styles.srOnly}>{market.name}示例持仓，原币种 {market.currency}</caption><thead><tr><th scope="col">资产 / 代码</th><th scope="col">持仓市值 ({market.currency})</th><th scope="col">占总持仓</th></tr></thead><tbody>{market.assets.map((asset) => <tr key={asset.symbol}><th scope="row"><strong>{asset.symbol}</strong><span>{asset.name}</span></th><td>{formatAmount(asset.quantity * asset.price)}<small>≈ ¥{formatAmount(asset.quantity * asset.price * rate)}</small></td><td>{portfolioPercent(asset.quantity * asset.price * rate)}</td></tr>)}</tbody></table>
      <div className={styles.marketSubtotal}><span>{market.name}小计</span><strong>{formatAmount(marketValue(market))} {market.currency}<small>≈ ¥{formatAmount(marketValue(market) * rate)} · {portfolioPercent(marketValue(market) * rate)}</small></strong></div>
    </div>
    <div className={styles.portfolioFoot}><p className={styles.note}>示例估值日期：{valuation.date}。静态价格与汇率，非本人资产。<br />1 USD = 7.10 CNY · 1 HKD = 0.91 CNY；占比保留一位小数，合计可能存在取整差异。</p><EntryAction entry="investment" className={styles.textButton}>查看完整持仓 <span aria-hidden="true">↗</span></EntryAction></div>
  </div>;
}
