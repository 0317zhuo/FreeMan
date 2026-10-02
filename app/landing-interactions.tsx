"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { entries, navigation, type Connection, type Entry, type EntryKey } from "./landing-data";
import styles from "./page.module.css";

const FeedbackContext = createContext<(message: string) => void>(() => {});

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<{ text: string; id: number } | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    if (document.activeElement === closeButton.current) trigger.current?.focus();
    setNotice(null);
  }, []);
  const show = useCallback((text: string) => {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setNotice({ text, id: Date.now() });
  }, []);
  useEffect(() => {
    if (!notice) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [notice, close]);
  return <FeedbackContext.Provider value={show}>
    {children}
    <div className={styles.noticeRegion}>
      <div role="status" aria-live="polite" aria-atomic="true">
        {notice && <p key={notice.id}><span aria-hidden="true">[i]</span> {notice.text}</p>}
      </div>
      {notice && <button ref={closeButton} className={styles.noticeClose} onClick={close} aria-label="关闭提示">×</button>}
    </div>
  </FeedbackContext.Provider>;
}

export function EntryAction({ entry, children, className, onChoose }: { entry: EntryKey | Entry; children: ReactNode; className?: string; onChoose?: () => void }) {
  const show = useContext(FeedbackContext);
  const target = typeof entry === "string" ? entries[entry] : entry;
  return target.available
    ? <a href={target.path} className={className} onClick={onChoose}>{children}</a>
    : <button type="button" className={className} onClick={() => { onChoose?.(); show(`${target.name}页面待开发。`); }}>{children}</button>;
}

export function ConnectionAction({ connection, community = false, children, className }: { connection: Connection; community?: boolean; children?: ReactNode; className?: string }) {
  const show = useContext(FeedbackContext);
  const content = children ?? <><Image src={`/icons/${connection.icon}.svg`} width={18} height={18} alt="" />{connection.name}</>;
  return connection.href
    ? <a className={className} href={connection.href} target="_blank" rel="noopener noreferrer" aria-label={`${connection.name}（在新标签页打开）`}>{content}</a>
    : <button className={className} type="button" aria-label={`${community ? "加入 " : ""}${connection.name}${connection.account ? " 联系方式" : community ? "，邀请链接待配置" : "，联系方式待配置"}`} onClick={() => show(connection.account ? `${connection.name}：${connection.account}` : `${connection.name} ${community ? "邀请链接" : "联系方式"}待配置。`)}>{content}</button>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenu(); };
    const query = window.matchMedia("(min-width: 1100px)");
    const onResize = () => { if (query.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    query.addEventListener("change", onResize);
    return () => { document.removeEventListener("keydown", onKey); query.removeEventListener("change", onResize); };
  }, [open, closeMenu]);
  const items = (mobile = false) => navigation.map((item, index) => {
    const content = <><span className={styles.navIndex}>0{index + 1}</span>{item.label}{item.badge && <span className={styles.navBadge}>{item.badge}</span>}</>;
    return item.entry
      ? <EntryAction key={item.label} entry={item.entry} className={styles.navLink} onChoose={mobile ? closeMenu : undefined}>{content}</EntryAction>
      : <a key={item.label} className={styles.navLink} href={item.href} onClick={mobile ? closeMenu : undefined}>{content}</a>;
  });
  return <header className={styles.header}>
    <div className={`${styles.shell} ${styles.headerInner}`}>
      <a className={styles.brand} href="#about" aria-label="FreeMan 首页"><pre className={styles.brandMark} aria-hidden="true">{"█▀▀ █▀▄▀█\n█▀  █ ▀ █\n▀   ▀   ▀"}</pre>freeman<span aria-hidden="true">_</span></a>
      <nav className={styles.desktopNav} aria-label="主导航">{items()}</nav>
      <button ref={toggle} className={styles.menuToggle} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>菜单 <span aria-hidden="true">{open ? "[−]" : "[+]"}</span></button>
    </div>
    <nav className={styles.mobileNav} id="mobile-navigation" aria-label="移动端导航" hidden={!open}>{items(true)}</nav>
  </header>;
}
