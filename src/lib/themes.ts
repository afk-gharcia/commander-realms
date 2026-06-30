/** URL slug from a content collection entry id (strips `.md` extension). */
export function themeSlug(id: string): string {
  return id.replace(/\.md$/, '');
}
