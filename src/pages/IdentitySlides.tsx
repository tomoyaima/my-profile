import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Progress,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import sampleDiagram from '../assets/react.svg';

type Slide = {
  title: string;
  bullets?: string[];
  notes?: string;
  image?: { src: string; alt?: string; caption?: string };
};

const slides: Slide[] = [
  {
    title: 'ID管理とは',
    bullets: [
      'ユーザーの本人確認・権限付与・ライフサイクル管理の総称',
      'Authentication(認証) と Authorization(認可) を中核に据える',
      'クラウド・マルチデバイス前提での一貫したID基盤が重要',
    ],
  },
  {
    title: '認証(Authentication)',
    bullets: [
      '要素: 知識(パスワード)、所持(デバイス/MFA)、生体(指紋/顔)',
      '多要素認証(MFA)・パスワードレス(WebAuthn, Passkeys)の活用',
      'セッション/トークンの有効期限・更新・失効を設計',
    ],
  },
  {
    title: '認可(Authorization)',
    bullets: [
      'RBAC(ロール) と ABAC(属性) の使い分け',
      '最小権限(Least Privilege) と職務分離(SoD)',
      'ポリシー管理の一元化と監査可能性',
    ],
  },
  {
    title: '標準プロトコル: OAuth 2.0 / OIDC',
    bullets: [
      'OIDCはOAuth 2.0にIDレイヤーを追加(ユーザー情報を安全に取得)',
      '主なフロー: Authorization Code(推奨), Device Code, Client Credentials',
      'Implicitは非推奨、PKCEを利用してコード奪取対策',
    ],
    image: {
      src: sampleDiagram,
      alt: 'サンプル図（差し替え可能）',
      caption: 'ここにフロー図や構成図を差し込み可能',
    },
  },
  {
    title: 'トークンとセッション',
    bullets: [
      'ID/Access/Refreshトークンの役割分担',
      'JWTの署名・失効・ローテーションと保管戦略',
      'Cookie(HTTPOnly, Secure, SameSite) と Storage の選択',
    ],
  },
  {
    title: 'SSOとフェデレーション',
    bullets: [
      'IdP/Spの分離、SAMLとOIDCの併用シナリオ',
      '組織内外SaaS接続、B2B/B2C連携',
      'アカウントリンクとプロビジョニングの一貫性',
    ],
  },
  {
    title: 'IDプロビジョニングとSCIM',
    bullets: [
      'SCIMでユーザー/グループを標準化して自動同期',
      '入社・異動・退社のライフサイクル自動化(Joiner-Mover-Leaver)',
      '手動運用の削減と監査性の向上',
    ],
  },
  {
    title: 'セキュリティ脅威と対策',
    bullets: [
      'フィッシング/トークン窃取/リプレイ: FIDO2, PKCE, TLS, 短寿命化',
      'ブルートフォース: レート制限、Bot対策、リスクベース認証',
      '権限昇格: 明示的な境界/ポリシー検証、監査ログ',
    ],
  },
  {
    title: 'ゼロトラストとコンテキスト認可',
    bullets: [
      'ネットワーク信頼前提を排し、毎回検証(never trust, always verify)',
      'デバイス姿勢・場所・時間・行動を考慮した動的ポリシー',
      'IDを中心とした統合的アクセス制御',
    ],
  },
  {
    title: '監査・可観測性・プライバシー',
    bullets: [
      '成功/失敗/異常のログ化、可視化ダッシュボード',
      'PII最小化、DPA/規制(例: GDPR)順守',
      'インシデント対応手順とアラート設計',
    ],
  },
  {
    title: '実装ベストプラクティス',
    bullets: [
      '標準プロトコル・認証基盤(IdP)の活用(例: Auth0, Azure AD)',
      '短命トークン+リフレッシュ、キー管理/ローテーション',
      'Infrastructure as Codeで設定をコード化、テストとレビュー',
    ],
  },
  {
    title: '参考アーキテクチャ',
    bullets: [
      'SPA → OIDC(Code+PKCE) → IdP、APIはAccess Token検証',
      'バックエンドはRBAC/ABACで細粒度認可、監査ログ集中管理',
      'SCIMでディレクトリとSaaS間を自動同期',
    ],
  },
];

const IdentitySlides: React.FC = () => {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const bg = useColorModeValue('gray.50', 'gray.700');

  const go = useCallback((i: number) => {
    setIndex((prev) => {
      const next = Math.max(0, Math.min(total - 1, i));
      return next;
    });
  }, [total]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Home') go(0);
      if (e.key === 'End') go(total - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, total]);

  const current = useMemo(() => slides[index], [index]);

  return (
    <Box maxW="960px" mx="auto" px={6} pt={28} pb={16}>
      <HStack justify="space-between" mb={3}>
        <Tag colorScheme="blue">ID管理スライド</Tag>
        <Tag>{index + 1} / {total}</Tag>
      </HStack>
      <Progress value={((index + 1) / total) * 100} size="sm" mb={6} />

      <Box bg={bg} p={{ base: 6, md: 10 }} rounded="lg" shadow="sm" minH={{ base: '320px', md: '420px' }}>
        <Stack spacing={6}>
          <Heading size="lg">{current.title}</Heading>
          {current.bullets && (
            <List spacing={3}>
              {current.bullets.map((b) => (
                <ListItem key={b}>
                  <Text fontSize={{ base: 'md', md: 'lg' }}>{b}</Text>
                </ListItem>
              ))}
            </List>
          )}
          {current.image && (
            <Box>
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="whiteAlpha.600"
                borderRadius="md"
                p={3}
              >
                <Image
                  src={current.image.src}
                  alt={current.image.alt || 'slide image'}
                  maxH={{ base: '180px', md: '220px' }}
                  maxW={{ base: '100%', md: '90%' }}
                  objectFit="contain"
                />
              </Box>
              {current.image.caption && (
                <Text mt={2} fontSize="sm" color="gray.500" textAlign="center">
                  {current.image.caption}
                </Text>
              )}
            </Box>
          )}
          {current.notes && (
            <Text fontSize="sm" color="gray.500">{current.notes}</Text>
          )}
        </Stack>
      </Box>

      <HStack mt={6} justify="space-between">
        <Button onClick={prev} isDisabled={index === 0} variant="outline">前へ</Button>
        <HStack>
          <Button onClick={() => go(0)} variant="ghost">最初へ</Button>
          <Button onClick={() => go(total - 1)} variant="ghost">最後へ</Button>
        </HStack>
        <Button onClick={next} colorScheme="blue" isDisabled={index === total - 1}>次へ</Button>
      </HStack>
      <Text mt={3} color="gray.500" fontSize="sm">←/→ または Space で移動、Home/End でジャンプ</Text>
    </Box>
  );
};

export default IdentitySlides;
