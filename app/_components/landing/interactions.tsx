"use client";

import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@/lib/assets";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { entries, navigation, type Connection, type Entry, type EntryKey } from "@/app/_data/entries";
import styles from "./landing.module.css";

type QrCode = NonNullable<Connection["qr"]> & { name: string; account?: string };
const FeedbackContext = createContext<{ show: (message: string) => void; showQr: (qr: QrCode) => void }>({ show: () => {}, showQr: () => {} });

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<{ text: string; id: number } | null>(null);
  const [qr, setQr] = useState<QrCode | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const qrTrigger = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const qrCloseButton = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    if (document.activeElement === closeButton.current) trigger.current?.focus();
    setNotice(null);
  }, []);
  const show = useCallback((text: string) => {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setNotice({ text, id: Date.now() });
  }, []);
  const showQr = useCallback((value: QrCode) => {
    qrTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQr(value);
  }, []);
  const closeQr = useCallback(() => {
    setQr(null);
    qrTrigger.current?.focus();
  }, []);
  useEffect(() => {
    if (!notice) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [notice, close]);
  useEffect(() => {
    if (!qr) return;
    qrCloseButton.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeQr(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [qr, closeQr]);
  return <FeedbackContext.Provider value={{ show, showQr }}>
    {children}
    {qr && <div className={styles.qrBackdrop} onClick={closeQr}>
      <section className={styles.qrDialog} role="dialog" aria-modal="true" aria-labelledby="qr-dialog-title" onClick={(event) => event.stopPropagation()}>
        <div className={styles.qrDialogHeading}>
          <div><h2 id="qr-dialog-title">添加我的{qr.name}</h2>{qr.account && <p>{qr.account}</p>}</div>
          <button ref={qrCloseButton} className={styles.qrClose} type="button" onClick={closeQr} aria-label="关闭二维码">×</button>
        </div>
        <Image className={styles.qrImage} src={assetUrl(qr.src)} width={qr.width} height={qr.height} alt={`${qr.name}个人二维码`} />
        <p className={styles.qrHint}>使用手机扫码添加</p>
      </section>
    </div>}
    <div className={styles.noticeRegion}>
      <div role="status" aria-live="polite" aria-atomic="true">
        {notice && <p key={notice.id}><span aria-hidden="true">[i]</span> {notice.text}</p>}
      </div>
      {notice && <button ref={closeButton} className={styles.noticeClose} onClick={close} aria-label="关闭提示">×</button>}
    </div>
  </FeedbackContext.Provider>;
}

export function EntryAction({ entry, children, className, onChoose, current = false }: { entry: EntryKey | Entry; children: ReactNode; className?: string; onChoose?: () => void; current?: boolean }) {
  const { show } = useContext(FeedbackContext);
  const target = typeof entry === "string" ? entries[entry] : entry;
  return target.available
    ? <Link href={target.path} className={className} onClick={onChoose} aria-current={current ? "page" : undefined}>{children}</Link>
    : <button type="button" className={className} onClick={() => { onChoose?.(); show(`${target.name}页面待开发。`); }}>{children}</button>;
}

export function ProjectRepositoryLink({ name, href }: { name: string; href?: string }) {
  const { show } = useContext(FeedbackContext);
  return href
    ? <a href={href} className={styles.projectLink} target="_blank" rel="noopener noreferrer" aria-label={`查看 ${name} 的 GitHub 仓库（在新标签页打开）`}><span>GitHub</span><span aria-hidden="true">↗</span></a>
    : <button type="button" className={styles.projectLink} aria-label={`${name} 的 GitHub 仓库链接待配置`} onClick={() => show(`${name} 的 GitHub 仓库链接待配置。`)}><span>GitHub</span><small>待配置</small></button>;
}

export function ConnectionAction({ connection, community = false, children, className }: { connection: Connection; community?: boolean; children?: ReactNode; className?: string }) {
  const { show, showQr } = useContext(FeedbackContext);
  const content = children ?? <><Image src={assetUrl(`/icons/${connection.icon}.svg`)} width={18} height={18} alt="" />{connection.name}</>;
  return connection.href
    ? <a className={className} href={connection.href} target="_blank" rel="noopener noreferrer" aria-label={`${connection.name}（在新标签页打开）`}>{content}</a>
    : <button className={className} type="button" aria-label={`${community ? "加入 " : ""}${connection.name}${connection.qr ? "二维码" : connection.account ? " 联系方式" : community ? "，邀请链接待配置" : "，联系方式待配置"}`} onClick={() => connection.qr ? showQr({ ...connection.qr, name: connection.name, account: connection.account }) : show(connection.account ? `${connection.name}：${connection.account}` : `${connection.name} ${community ? "邀请链接" : "联系方式"}待配置。`)}>{content}</button>;
}

export function Header({ currentEntry }: { currentEntry?: EntryKey }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => { setOpen(false); toggle.current?.focus(); }, []);
  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const currentY = window.scrollY;
        const distance = currentY - previousY;
        if (currentY <= 24) setHidden(false);
        else if (open) setHidden(false);
        else if (Math.abs(distance) >= 5) setHidden(distance > 0);
        if (Math.abs(distance) >= 5 || currentY <= 24) previousY = currentY;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeMenu(); };
    const query = window.matchMedia("(min-width: 1100px)");
    const onResize = () => { if (query.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    query.addEventListener("change", onResize);
    return () => { document.removeEventListener("keydown", onKey); query.removeEventListener("change", onResize); };
  }, [open, closeMenu]);
  const items = (mobile = false) => navigation.map((item) => {
    const content = <>{item.label}{item.badge && <span className={styles.navBadge}>{item.badge}</span>}</>;
    return item.entry
      ? <EntryAction key={item.label} entry={item.entry} current={currentEntry === item.entry} className={styles.navLink} onChoose={mobile ? closeMenu : undefined}>{content}</EntryAction>
      : <a key={item.label} className={styles.navLink} href={currentEntry ? `/${item.href}` : item.href} onClick={mobile ? closeMenu : undefined}>{content}</a>;
  });
  return <header className={styles.header} data-hidden={hidden} onFocusCapture={() => setHidden(false)}>
    <div className={`${styles.shell} ${styles.headerInner}`}>
      <a className={styles.brand} href={currentEntry ? "/#about" : "#about"} aria-label="FreeMan 首页"><pre className={styles.brandMark} aria-hidden="true">{"█▀▀ █▀▄▀█\n█▀  █ ▀ █\n▀   ▀   ▀"}</pre>freeman<span aria-hidden="true">_</span></a>
      <nav className={styles.desktopNav} aria-label="主导航">{items()}</nav>
      <button ref={toggle} className={styles.menuToggle} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { setHidden(false); setOpen(!open); }}>菜单 <span aria-hidden="true">{open ? "[−]" : "[+]"}</span></button>
    </div>
    <nav className={styles.mobileNav} id="mobile-navigation" aria-label="移动端导航" hidden={!open}>{items(true)}</nav>
  </header>;
}
