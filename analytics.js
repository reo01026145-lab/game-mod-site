// ゲーム改造研究所・アクセス集計
// Supabase SQL Editorで analytics-setup.sql を一度実行すると動作します。
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let client = null;
  let lastPeak = 0;
  let readTimer = null;
  const fmt = n => Number.isFinite(Number(n)) ? Number(n).toLocaleString('ja-JP') : '—';
  const set = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  function render(data) {
    if (!data || typeof data !== 'object') return;
    set('visitsToday',fmt(data.today));
    set('visitsTotal',fmt(data.total));
    set('visitsFromX',fmt(data.from_x));
    set('onlinePeak',fmt(data.peak));
    set('analyticsStatus','集計中 · 日本時間で日付更新 / タブ単位のセッション概数');
    lastPeak=Math.max(lastPeak,Number(data.peak)||0);
  }
  async function refresh() {
    if (!client) return;
    const {data,error}=await client.rpc('site_stats_read');
    if (error) { set('analyticsStatus','アクセス解析はSupabaseで初期設定待ち'); return; }
    render(data);
  }
  function trafficSource() {
    const tagged=new URLSearchParams(location.search).get('utm_source');
    if(tagged && /^(x|twitter)$/i.test(tagged)) return 'x';
    try {
      const host=new URL(document.referrer).hostname.toLowerCase();
      if(host==='x.com'||host.endsWith('.x.com')||host==='twitter.com'||host.endsWith('.twitter.com')||host==='t.co') return 'x';
    } catch (_) {}
    return 'other';
  }
  function visitId() {
    const key='game-mod-analytics-visit-v1';
    try {
      let saved=sessionStorage.getItem(key);
      if(!saved){saved=crypto.randomUUID();sessionStorage.setItem(key,saved);}
      return saved;
    } catch(_){return crypto.randomUUID();}
  }
  async function init(supabaseClient) {
    if(client) return;
    client=supabaseClient;
    set('analyticsStatus','アクセス解析に接続中…');
    const {data,error}=await client.rpc('site_visit_once',{p_visit_id:visitId(),p_source:trafficSource()});
    if(error) set('analyticsStatus','アクセス解析はSupabaseで初期設定待ち');
    else render(data);
    readTimer=setInterval(refresh,60000);
    window.addEventListener('pagehide',()=>{if(readTimer)clearInterval(readTimer);},{once:true});
  }
  async function reportPeak(current) {
    if(!client||!Number.isInteger(current)||current<=lastPeak||current>1000) return;
    const {data,error}=await client.rpc('site_peak_report',{p_online:current});
    if(!error&&Number.isFinite(Number(data))){
      lastPeak=Math.max(lastPeak,Number(data));
      set('onlinePeak',fmt(data));
    }
  }
  window.siteAnalytics={init,reportPeak};
})();
