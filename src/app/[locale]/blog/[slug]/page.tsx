import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Clock, User, Calendar, Share2, Sparkles, MessageSquare } from "lucide-react";
import CtaSection from "@/components/sections/CtaSection";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "en" ? "Back to Articles" : "Retour aux articles"}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12 pb-8 border-b border-obsidian-border">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-violet-soft text-violet-glow border border-violet-electric/20 mb-4">
            {post.category}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet-electric/20 flex items-center justify-center text-violet-glow font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <span className="font-semibold text-white block">{post.author}</span>
                  <span className="text-[11px] text-slate-500">{post.authorRole}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content Render */}
        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-base leading-relaxed mb-16">
          {post.content.split("\n\n").map((block, idx) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="font-heading font-bold text-2xl sm:text-3xl text-white pt-6 pb-2 border-b border-obsidian-border"
                >
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("- ")) {
              const listItems = block.split("\n").map((line) => line.replace("- ", ""));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside text-slate-300">
                  {listItems.map((li, lIdx) => (
                    <li key={lIdx}>{li}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\./.test(block)) {
              const listItems = block.split("\n");
              return (
                <ol key={idx} className="space-y-2 list-decimal list-inside text-slate-300">
                  {listItems.map((li, lIdx) => (
                    <li key={lIdx}>{li.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx}>{block}</p>;
          })}
        </div>

        {/* Inline AI Fast Qualification Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-950/40 to-obsidian-surface border border-violet-electric/40 shadow-violet mb-16 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic Express</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-white">
              Vous souhaitez appliquer ces solutions à votre entreprise ?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
              Notre assistant IA évalue la faisabilité et le retour sur investissement de votre projet en 2 minutes.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full bg-violet-electric hover:bg-violet-hover text-white text-xs font-semibold shadow-violet shrink-0"
          >
            Lancer l'échange
          </Link>
        </div>

        <CtaSection />
      </div>
    </article>
  );
}
