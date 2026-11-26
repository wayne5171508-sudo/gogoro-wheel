// ★ 部署時只要改這兩行（在 Supabase：Project Settings → API 找得到）
const SUPABASE_URL = 'https://twcbmlpzbgvtlsrwkdrm.supabase.co';
const SUPABASE_KEY = 'sb_publishable__WDTcvydAJ2vLZEkBG33SA_WDSd21Sy';

const WHEEL_NAMES = { A: '推薦賞車試乘', B: '推薦成功購車' };

async function rpc(fn, args) {
  if (SUPABASE_URL.includes('你的') || SUPABASE_KEY.includes('你的')) throw new Error('尚未設定 config.js 的 Supabase 網址與金鑰');
  const headers = { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' };
  if (SUPABASE_KEY.startsWith('eyJ')) headers.Authorization = 'Bearer ' + SUPABASE_KEY; // 舊版 anon key
  let r;
  try {
    r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, { method: 'POST', headers, body: JSON.stringify(args) });
  } catch {
    throw new Error('網路連線失敗，請確認平板有連上網路');
  }
  const data = await r.json().catch(() => null);
  if (!r.ok) throw new Error((data && data.message) || '系統錯誤，請稍後再試');
  return data;
}
