import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "CareerHub Blog - Career Advice, Interview Tips & Jobs",
  description: "Read the latest tips on resume building, interview preparation, and career growth.",
};

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true, deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } }
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-4">CareerHub <span className="text-primary">Blog</span></h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Expert advice to accelerate your career, build a killer resume, and ace your next interview.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-blue-600/10 flex items-center justify-center">
                      <span className="text-primary/40 font-bold text-2xl">{post.category.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="hover:bg-primary hover:text-white transition-colors">{post.category.replace('_', ' ')}</Badge>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1"/> {post.createdAt.toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                  <div className="text-sm font-semibold text-slate-900 border-t border-slate-100 pt-4">
                    By {post.author?.name || "CareerHub Editor"}
                  </div>
                </div>
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
