/**
 * Clean text by removing emojis and markdown formatting
 */
export function cleanTextForSlug(text: string): string {
  return text
    .replace(/:[a-z_]+:/g, '') // Remove emoji shortcodes
    .replace(/[*_~`]/g, '') // Remove markdown formatting
    .replace(/🎯|🔄|🔍|🧪|📚|🛠️|🚀|🐛|⚡|📋|🎓|💬|✅|❌|⭐|🌟|📝|📊|💡|🎨|🔒|📱|🛡️|🔧|💻|📈|🎲|🎪|🏆|🚩|📌|🔥|💎|🎯|🎨|🔮|⚙️|🔩|🎪|🎊|🎉|🎈|🎁|🎀|👑|💯|🔴|🟠|🟡|🟢|🔵|🟣|⚫|⚪|🟤|🔺|🔻|🔸|🔹|🔶|🔷|⭕|❌|✔️|✅|❎|✳️|✴️|❇️|‼️|⁉️|❓|❔|❕|❗|〰️|⚠️|🚸|🔱|⚜️|🔰|♻️|✅|🈯|💹|❇️|✳️|❎|🌐|💠|Ⓜ️|🌀|💤|🏧|🚾|♿|🅿️|🈳|🈂️|🛂|🛃|🛄|🛅/g, '') // Remove common emojis
    .trim();
}

/**
 * Create a deterministic slug from text without using GithubSlugger
 * This ensures consistent results between server and client rendering
 */
export function createSlug(text: string): string {
  return cleanTextForSlug(text)
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\u4e00-\u9fff-]/g, '') // Keep only word characters, Chinese characters, and hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Extract table of contents items from markdown content
 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractTocItems(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const items: TocItem[] = [];
  const usedSlugs = new Set<string>();
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    let id = createSlug(text);
    
    // Handle duplicate slugs by adding a number suffix
    let counter = 1;
    let originalId = id;
    while (usedSlugs.has(id)) {
      id = `${originalId}-${counter}`;
      counter++;
    }
    usedSlugs.add(id);
    
    items.push({ id, text, level });
  }

  return items;
}