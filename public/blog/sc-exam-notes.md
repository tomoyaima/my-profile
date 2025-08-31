# 情報処理安全確保支援士 合格メモ

実務視点での要点整理と勉強メモです。午後問題の読解と要件整理を軸に、設問に対して「何を」「どの粒度で」答えるかに集中しました。

## 学習計画（ざっくり）
- [x] 午前Ⅰ・Ⅱは通勤時間に過去問アプリ（30分/日）
- [x] 午後Ⅰの読み方訓練（設問→根拠→図で整合性チェック）
- [ ] 午後Ⅱの答案テンプレを固める（結論→根拠→補足の順）

## よく出るトピック（例）
| 分野 | 要点 |
| --- | --- |
| 認証/認可 | MFA、ID連携、最小権限、職務分離 |
| ネットワーク | セグメント分割、FW/IDS/IPS、ゼロトラスト |
| ログ | 攻撃兆候、相関分析、保全と改ざん対策 |
| 開発 | 脆弱性（XSS/SQLi/CSRF）、依存管理、CIでSAST |

## ミスりやすい観点
- [ ] 要件の主語（システム/運用/利用者）がブレる
- [ ] リスク対策が抽象的（具体的な操作/設定まで落とす）
- [x] ログの保存先・保持期間・タイムスタンプ同期を忘れがち

## 例：アクセスログの相関確認（擬似コード）
```ts
// userId/端末/時刻帯で相関し、異常スコアを集計
import { parse } from 'std:log';

type Log = { user: string; ip: string; ua: string; ts: number };
const logs: Log[] = load("/var/log/access.log");

const byUser = new Map<string, Log[]>();
for (const l of logs) {
  const k = l.user;
  if (!byUser.has(k)) byUser.set(k, []);
  byUser.get(k)!.push(l);
}

for (const [user, items] of byUser) {
  const uniqIPs = new Set(items.map(i => i.ip)).size;
  const nightRate = items.filter(i => new Date(i.ts).getHours() < 5).length / items.length;
  const score = uniqIPs * 0.5 + (nightRate > 0.3 ? 2 : 0);
  if (score >= 2.5) alert(`異常: ${user}`);
}
```

## 参考（脚注付き）
- 監査証跡の改ざん検知は[^1]、鍵管理・時刻同期・WORMなどの多層対策が有効。

[^1]: 例：時刻署名付きハッシュチェーンや外部書き込み、SIEMでの改ざん検出ルール。
