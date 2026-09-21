import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getBlogPosts } from "@/lib/blog";
import { BookOpen, Clock, ArrowRight, Sparkles, User } from "lucide-react";
import CtaSection from "@/components/sections/CtaSection";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getBlogPosts(locale);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-soft border border-violet-electric/30 text-xs font-semibold text-violet-300 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-violet-glow" />
            <span>{locale === "en" ? "Insights & Engineering" : "Blog & Analyses"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {locale === "en"
              ? "Strategies for Digital Transformation"
              : "Analyses, Stratégies & Ingénierie Digitale"}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            {locale === "en"
              ? "Actionable blueprints on custom software, AI automations, and modern web architectures for ambitious companies."
              : "Retours d'expérience, études de rentabilité et bonnes pratiques pour propulser votre entreprise avec les technologies modernes."}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border hover:border-violet-electric/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-violet-soft text-violet-glow border border-violet-electric/20">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-violet-300 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-obsidian-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-violet-electric/20 flex items-center justify-center text-violet-glow text-[10px] font-bold">
                    {post.author[0]}
                  </div>
                  <span>{post.author}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-glow hover:text-violet-300 transition-colors"
                >
                  <span>{locale === "en" ? "Read Article" : "Lire l'article"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <CtaSection />
      </div>
    </div>
  );
}
