# React パフォーマンス最適化メモ

描画の無駄を減らし、体感速度を上げるための要点を短く整理します。

## 基本方針
- [x] 再レンダーを減らす（props/stateの粒度を見直す）
- [x] コンポーネント分割と `React.memo` の活用
- [ ] 重い処理は `useMemo` / `useCallback` でメモ化

## よくあるボトルネック例
| 症状 | 典型原因 | 処方箋 |
|---|---|---|
| 入力遅延 | 親のstate変更で全子が再描画 | 分割 + `memo` + リストの `key` 最適化 |
| リスト重い | 毎回のマッピング/計算 | バーチャルリスト + 事前計算/メモ化 |

## 例: メモ化の前後
```tsx
const List = ({ items }: { items: string[] }) => {
  return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
}

// 改善: 重い整形をメモ化
const ListFast = ({ items }: { items: string[] }) => {
  const view = useMemo(() => items.map(i => <li key={i}>{i}</li>), [items]);
  return <ul>{view}</ul>
}
```

[^1]: プロファイラで「何が」「どのくらい」遅いかを先に確認。
