# AWSコスト最適化 実践メモ

コストは「設計」「運用」「可視化」の積み重ねで下がります。

## アクションリスト
- [x] Cost Explorer/タグで可視化
- [x] Idle/Underutilizedの洗い出し（Compute Optimizer）
- [ ] Savings Plans/RIの適用検討
- [ ] ストレージ階層化（S3 IA/Glacier）

## 簡易チェック表
| 項目 | 状態 | 次アクション |
|---|---|---|
| EC2/SP/RI | 未適用 | 直近1年の稼働を元に試算 |
| EBS | gp2多 | gp3移行とボリューム統合 |
| S3 | Standard多 | ライフサイクル/IA/Glacier検討 |

```bash
# コスト可視化タグ例
Project=my-blog
Env=prod
Owner=you
```

[^1]: コスト低減は一括でなく継続運用（週次レビュー/四半期見直し）で。
