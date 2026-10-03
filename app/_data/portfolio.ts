import "server-only";

// 全部为静态示例；price 为原币种单价，rate 为每单位原币换算 CNY。
export const valuation = { date: "2026-09-30", rates: { USD: 7.1, HKD: 0.91, CNY: 1 } };
export type Currency = keyof typeof valuation.rates;
export const markets: { id: string; name: string; currency: Currency; assets: { symbol: string; name: string; quantity: number; price: number }[] }[] = [
  { id: "us", name: "美股", currency: "USD", assets: [{ symbol: "AAPL", name: "苹果", quantity: 20, price: 220 }, { symbol: "MSFT", name: "微软", quantity: 10, price: 420 }, { symbol: "NVDA", name: "英伟达", quantity: 30, price: 120 }] },
  { id: "crypto", name: "加密市场", currency: "USD", assets: [{ symbol: "BTC", name: "比特币", quantity: 0.1, price: 65000 }, { symbol: "ETH", name: "以太坊", quantity: 2, price: 2800 }] },
  { id: "cn", name: "A股", currency: "CNY", assets: [{ symbol: "510300", name: "沪深300 ETF", quantity: 5000, price: 4 }, { symbol: "600519", name: "贵州茅台", quantity: 10, price: 1500 }] },
  { id: "hk", name: "港股", currency: "HKD", assets: [{ symbol: "00700", name: "腾讯控股", quantity: 100, price: 400 }, { symbol: "09988", name: "阿里巴巴", quantity: 200, price: 90 }] },
];
export const marketValue = (market: (typeof markets)[number]) => market.assets.reduce((sum, asset) => sum + asset.quantity * asset.price, 0);
export const totalCny = markets.reduce((sum, market) => sum + marketValue(market) * valuation.rates[market.currency], 0);
export const portfolioPercent = (valueCny: number) => `${(valueCny / totalCny * 100).toFixed(1)}%`;
