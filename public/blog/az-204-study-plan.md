# AZ-204 学習ロードマップ

開発者向けのAzure試験。ハンズオン中心で習得していく計画案です。

## 学習フェーズ
1. Azure Functions / App Service
2. ストレージ（Blob/Queue/Table/Cosmos）
3. セキュリティ（Managed Identity / Key Vault / RBAC）
4. モニタリング（App Insights / Log Analytics）

## チェックリスト
- [x] Functionsのトリガ/バインディングを説明できる
- [ ] Managed Identityでシークレットレス接続
- [ ] デプロイ方法（CI/CD, Bicep/ARM）を比較できる

```json
{
  "app": "api",
  "identity": "SystemAssigned",
  "auth": "OIDC"
}
```

[^1]: 試験範囲は更新されるため、公式のSkill Measuredを定期確認。
