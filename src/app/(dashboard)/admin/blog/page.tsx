"use client";

import { useTransition } from "react";
import { deleteBlogPost } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminBlogIndex() {
  const [isPending, startTransition] = useTransition();

  // Mock data for UI demonstration
  const posts = [
    { id: "1", title: "Top 10 Resume Tips for 2026", category: "RESUME_TIPS", isPublished: true, createdAt: new Date() },
    { id: "2", title: "Cracking the Tech Interview", category: "INTERVIEW_QUESTIONS", isPublished: false, createdAt: new Date() }
  ];

  const handleDelete = (id: string) => {
    if(confirm("Are you sure?")) {
      startTransition(() => {
        deleteBlogPost(id);
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog CMS</h1>
          <p className="text-muted-foreground mt-1">Manage articles, guides, and SEO content.</p>
        </div>
        <Button render={<Link href="/admin/blog/new" />}>
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="modern-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-semibold">{post.title}</td>
                <td className="px-6 py-4"><Badge variant="outline">{post.category.replace('_', ' ')}</Badge></td>
                <td className="px-6 py-4">
                  {post.isPublished ? <Badge className="bg-emerald-100 text-emerald-800">Published</Badge> : <Badge variant="secondary">Draft</Badge>}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Edit (Coming soon)">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} disabled={isPending}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
