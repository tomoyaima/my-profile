import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Link, VStack, Skeleton, HStack, Tag, Progress, IconButton, Button, Image } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

type Meta = { slug: string; title: string; date?: string; tags?: string[]; excerpt?: string; cover?: string };
type TocItem = { id: string; text: string; level: number };

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightCode(code: string, lang: string) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let html = esc(code);
  if (/^(js|ts|tsx|jsx)$/.test(lang)) {
    const keywords = /(\b(const|let|var|function|return|if|else|for|while|break|continue|switch|case|default|new|class|extends|super|import|from|export|async|await|try|catch|throw|typeof|in|of)\b)/g;
    html = html
      .replace(/(\/\/.*)$/gm, '<span class="token comment">$1</span>')
      .replace(/(['\"][^'\"\n]*['\"])|(`[^`\n]*`)/g, '<span class="token string">$1</span>')
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token number">$1</span>')
      .replace(keywords, '<span class="token keyword">$1</span>');
  } else if (/^json$/.test(lang)) {
    html = html
      .replace(/(\{|\}|\[|\]|:|,)/g, '<span class="token punctuation">$1</span>')
      .replace(/(\"[^\"]*\"\s*:)/g, '<span class="token property">$1</span>')
      .replace(/(:\s*\"[^\"]*\")/g, ': <span class="token string">$1</span>')
      .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="token number">$1</span>');
  } else if (/^(bash|sh)$/.test(lang)) {
    const escFull = esc(code);
    html = escFull
      .replace(/(^|\n)#([^\n]*)/g, '$1<span class="token comment">#$2</span>')
      .replace(/\b(cd|ls|cat|echo|npm|yarn|pnpm|git|node)\b/g, '<span class="token keyword">$1</span>');
  }
  return html;
}

function renderMarkdown(md: string) {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  const toc: TocItem[] = [];
  let inCode = false;
  let codeLang = '';
  const footnotes: Record<string, string> = {};
  let listMode: null | 'ul' | 'ol' = null;

  const flushParagraph = (buf: string[]) => {
    if (!buf.length) return;
    out.push(`<p>${buf.join(' ')}</p>`);
    buf.length = 0;
  };
  const paraBuf: string[] = [];

  const closeList = () => {
    if (listMode) {
      out.push(listMode === 'ul' ? '</ul>' : '</ol>');
      listMode = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\t/g, '    ');

    // code fence
    const codeFence = line.match(/^```\s*([\w-]+)?\s*$/);
    if (codeFence) {
      if (inCode) {
        out.push('</code></pre>');
        inCode = false;
        continue;
      } else {
        closeList();
        flushParagraph(paraBuf);
        codeLang = codeFence[1] || '';
        out.push(`<pre><code class="language-${codeLang}">`);
        inCode = true;
        continue;
      }
    }

    if (inCode) {
      const highlighted = highlightCode(raw + "\n", codeLang);
      out.push(highlighted);
      continue;
    }

    // Footnote definition: [^id]: text
    const foot = line.match(/^\[\^(.+?)\]:\s*(.*)$/);
    if (foot) {
      footnotes[foot[1]] = foot[2];
      continue;
    }

    if (!line.trim()) {
      closeList();
      flushParagraph(paraBuf);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      flushParagraph(paraBuf);
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      toc.push({ id, text, level });
      out.push(`<h${level} id="${id}">${escapeInline(text)}</h${level}>`);
      continue;
    }

    // Checklist - [ ] / [x]
    const checklist = line.match(/^[-*]\s+\[( |x|X)\]\s+(.*)$/);
    if (checklist) {
      if (listMode !== 'ul') {
        closeList();
        flushParagraph(paraBuf);
        out.push('<ul>');
        listMode = 'ul';
      }
      const checked = /x/i.test(checklist[1]);
      out.push(`<li><input type=\"checkbox\" disabled ${checked ? 'checked' : ''}/> ${escapeInline(checklist[2])}</li>`);
      continue;
    }

    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      if (listMode !== 'ul') {
        closeList();
        flushParagraph(paraBuf);
        out.push('<ul>');
        listMode = 'ul';
      }
      out.push(`<li>${escapeInline(ul[1])}</li>`);
      continue;
    }

    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      if (listMode !== 'ol') {
        closeList();
        flushParagraph(paraBuf);
        out.push('<ol>');
        listMode = 'ol';
      }
      out.push(`<li>${escapeInline(ol[1])}</li>`);
      continue;
    }

    const hr = line.match(/^(-{3,}|\*{3,}|_{3,})\s*$/);
    if (hr) {
      closeList();
      flushParagraph(paraBuf);
      out.push('<hr/>');
      continue;
    }

    // Table (simple GFM)
    if (/^\|/.test(line)) {
      const next = lines[i + 1] || '';
      if (/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(next)) {
        closeList();
        flushParagraph(paraBuf);
        const headerCells = line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        const aligns = next.replace(/^\||\|$/g, '').split('|').map((c) => (c.includes(':') ? (c.startsWith(':') && c.endsWith(':') ? 'center' : c.startsWith(':') ? 'left' : 'right') : 'left'));
        i += 1;
        const rows: string[] = [];
        let ri = i + 1;
        while (ri < lines.length && /^\|/.test(lines[ri])) {
          const rowCells = lines[ri].replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
          rows.push('<tr>' + rowCells.map((c, idx) => `<td style=\"text-align:${aligns[idx] || 'left'}\">${escapeInline(c)}</td>`).join('') + '</tr>');
          ri++;
        }
        i = ri - 1;
        out.push('<table>');
        out.push('<thead><tr>' + headerCells.map((c, idx) => `<th style=\"text-align:${aligns[idx] || 'left'}\">${escapeInline(c)}</th>`).join('') + '</tr></thead>');
        out.push('<tbody>' + rows.join('') + '</tbody>');
        out.push('</table>');
        continue;
      }
    }

    // paragraph line
    paraBuf.push(escapeInline(line.trim()))
  }

  closeList();
  flushParagraph(paraBuf);

  // Append footnotes at the end
  const fkeys = Object.keys(footnotes);
  if (fkeys.length) {
    out.push('<hr/>');
    out.push('<h3 id="footnotes">脚注</h3>');
    out.push('<ol>');
    fkeys.forEach((k) => out.push(`<li id=\"fn-${k}\">${escapeInline(footnotes[k])}</li>`));
    out.push('</ol>');
  }

  function escapeInline(s: string) {
    let t = escapeHtml(s);
    // code `code`
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    // bold **text**
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // italic *text*
    t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // links [text](url)
    t = t.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    // footnote reference [^id]
    t = t.replace(/\[\^(.+?)\]/g, '<sup><a href="#fn-$1">[$1]</a></sup>');
    return t;
  }

  return { html: out.join('\n'), toc };
}

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [metaList, setMetaList] = React.useState<Meta[] | null>(null);
  const articleRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const [resMd, resIdx] = await Promise.all([
          fetch(`/blog/${slug}.md`, { cache: 'no-store' }),
          fetch('/blog/index.json', { cache: 'no-store' }),
        ]);
        if (!resMd.ok) throw new Error(String(resMd.status));
        const text = await resMd.text();
        const idx = resIdx.ok ? ((await resIdx.json()) as Meta[]) : null;
        if (!cancelled) {
          setContent(text);
          setMetaList(idx);
        }
      } catch (e) {
        if (!cancelled) setError('記事の読み込みに失敗しました');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  React.useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rectTop = el.getBoundingClientRect().top + window.scrollY;
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const total = el.offsetHeight - viewport;
      const p = Math.max(0, Math.min(1, (scrollY - rectTop) / Math.max(total, 1)));
      setProgress(Math.round(p * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [content]);

  const meta = React.useMemo(() => {
    if (!metaList || !slug) return null;
    return metaList.find((m) => m.slug === slug) || null;
  }, [metaList, slug]);

  const nav = React.useMemo(() => {
    if (!metaList || !slug) return null;
    const idx = metaList.findIndex((m) => m.slug === slug);
    return {
      prev: idx > 0 ? metaList[idx - 1] : null,
      next: idx >= 0 && idx < metaList.length - 1 ? metaList[idx + 1] : null,
    };
  }, [metaList, slug]);

  const rendered = React.useMemo(() => (content ? renderMarkdown(content) : { html: '', toc: [] }), [content]);

  return (
    <Box maxW="960px" mx="auto" px={6} pt={24} pb={16}>
      <Progress value={progress} size="xs" colorScheme="blue" mb={4} />
      <VStack align="stretch" spacing={4}>
        {meta?.cover && (
          <Box position="relative" w="100%" h={{ base: '220px', md: '320px' }} overflow="hidden" borderRadius="md">
            <Image src={meta.cover} alt={meta.title} objectFit="cover" w="100%" h="100%" />
            <Box position="absolute" inset={0} bg="blackAlpha.500" />
            <Box position="absolute" bottom={0} px={{ base: 4, md: 6 }} py={{ base: 3, md: 5 }} color="white">
              <Heading size={{ base: 'lg', md: 'xl' }}>{meta?.title || slug}</Heading>
              {meta?.date && <Text opacity={0.9} fontSize="sm" mt={2}>{meta.date}</Text>}
              {meta?.tags && (
                <HStack spacing={2} mt={2}>
                  {meta.tags.map((t) => <Tag key={t} size="sm" colorScheme="blue">{t}</Tag>)}
                </HStack>
              )}
            </Box>
          </Box>
        )}
        <HStack justify="space-between" align="center">
          <Link as={RouterLink} to="/blog" color="blue.600"><ArrowBackIcon mr={1}/> 記事一覧へ</Link>
          <HStack>
            {nav?.prev && (
              <IconButton as={RouterLink} to={`/blog/${nav.prev.slug}`} aria-label="前の記事" icon={<ArrowLeftIcon />} size="sm" variant="outline" />
            )}
            {nav?.next && (
              <IconButton as={RouterLink} to={`/blog/${nav.next.slug}`} aria-label="次の記事" icon={<ArrowRightIcon />} size="sm" variant="outline" />
            )}
          </HStack>
        </HStack>

        {!meta?.cover && (
          <>
            <Heading size="lg">{meta?.title || slug}</Heading>
            {meta?.date && <Text color="gray.600" fontSize="sm">{meta.date}</Text>}
            {meta?.tags && (
              <HStack spacing={2}>
                {meta.tags.map((t) => <Tag key={t} size="sm" colorScheme="blue">{t}</Tag>)}
              </HStack>
            )}
          </>
        )}

        {/* Share buttons */}
        <HStack spacing={3}>
          {(() => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(meta?.title || slug || '');
            const x = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            const li = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            const hb = `https://b.hatena.ne.jp/entry/panel/?url=${url}`;
            return (
              <>
                <Button as={Link} href={x} target="_blank" rel="noreferrer" size="sm" colorScheme="twitter">Xで共有</Button>
                <Button as={Link} href={li} target="_blank" rel="noreferrer" size="sm" colorScheme="linkedin">LinkedInで共有</Button>
                <Button as={Link} href={hb} target="_blank" rel="noreferrer" size="sm" colorScheme="teal">はてブ</Button>
              </>
            );
          })()}
        </HStack>

        {loading && <Skeleton height="200px" />}
        {error && <Text color="red.500">{error}</Text>}
        {content && (
          <Box
            ref={articleRef}
            sx={{
              'h1': { fontSize: '2xl', mt: 6, mb: 2 },
              'h2': { fontSize: 'xl', mt: 6, mb: 2 },
              'h3': { fontSize: 'lg', mt: 5, mb: 2 },
              'p': { lineHeight: 1.9, mt: 3 },
              'ul': { pl: 6, mt: 3, listStyleType: 'disc' },
              'ol': { pl: 6, mt: 3, listStyleType: 'decimal' },
              'li': { mt: 1 },
              'table': { width: '100%', borderCollapse: 'collapse', mt: 4 },
              'th, td': { border: '1px solid', borderColor: 'gray.200', p: 2 },
              'thead th': { bg: 'gray.50' },
              'input[type="checkbox"]': { marginRight: '8px' },
              'code': { bg: 'gray.100', px: 1, borderRadius: 'md' },
              'pre': { bg: 'gray.900', color: 'gray.100', p: 4, borderRadius: 'md', overflowX: 'auto', mt: 4 },
              'code .token.keyword': { color: '#c792ea' },
              'code .token.string': { color: '#ecc48d' },
              'code .token.number': { color: '#f78c6c' },
              'code .token.comment': { color: '#5c6370' },
              'code .token.property': { color: '#82aaff' },
              'code .token.punctuation': { color: '#89ddff' },
              'hr': { my: 6 },
              'a': { color: 'blue.600', textDecoration: 'underline' },
            }}
            dangerouslySetInnerHTML={{ __html: rendered.html }}
          />
        )}

        {rendered.toc.length > 0 && (
          <Box mt={8}>
            <Heading size="sm" mb={2}>目次</Heading>
            <VStack align="stretch" spacing={1}>
              {rendered.toc.map((t) => (
                <Link key={t.id} href={`#${t.id}`} ml={`${(t.level - 1) * 12}px`} color="blue.600">{t.text}</Link>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default BlogPost;
