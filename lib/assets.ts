const assetBaseUrl = (process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "").trim().replace(/\/+$/, "");

// path 对应 public 内的根路径；环境变量可包含对象存储的目录前缀。
export function assetUrl(path: string) {
  return `${assetBaseUrl}${path}`;
}
