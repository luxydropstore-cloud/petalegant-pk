<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->
- Product lists fall back to the local catalog in src/lib/catalog.ts (owner photos, WhatsApp-only, no variants) whenever Shopify returns no products — so the shop is never empty while the store has no items.
- Build every page's head with `pageHead` in src/lib/seo.ts (self-referencing canonical + og:url from `SITE_URL`) so canonical, sitemap and structured data always use the public address, never a preview URL.
- The Google Search Console `google-site-verification` meta tag in src/routes/__root.tsx proves site ownership; never remove it.
- Rule: photo .asset.json URLs are rewritten to the absolute Lovable host in vite.config.ts so images work on non-Lovable hosting (Netlify).
