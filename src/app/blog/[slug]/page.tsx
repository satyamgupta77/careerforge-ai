import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, UserCircle } from "lucide-react";
import Link from "next/link";

// Dynamic SEO Generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | CareerHub Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } } }
  });

  if (!post || (!post.isPublished && process.env.NODE_ENV === "production")) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="text-primary hover:underline text-sm font-semibold mb-6 inline-block">
            &larr; Back to Blog
          </Link>
          <div className="mb-6 flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">{post.category.replace('_', ' ')}</Badge>
            <span className="text-sm text-muted-foreground flex items-center"><Calendar className="w-4 h-4 mr-1"/> {post.createdAt.toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-slate-900">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <UserCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">{post.author?.name || "CareerHub Editor"}</div>
              <div className="text-sm text-muted-foreground">Author</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="container mx-auto px-4 max-w-3xl py-16 prose prose-slate prose-lg md:prose-xl prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
        {/* In production, we would use a library like html-react-parser or ReactMarkdown to securely render this content */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
