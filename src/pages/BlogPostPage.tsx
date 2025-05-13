
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "@/data/BlogData";
import { ArrowLeft, Calendar, Clock, Share2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BlogPost from "@/components/BlogPost";

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const post = blogPosts.find((p) => p.id === postId);
  
  // Find related posts that share tags with the current post
  const relatedPosts = post
    ? blogPosts
        .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
        .slice(0, 3)
    : [];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // If post doesn't exist, redirect to blog listing
    if (!post && postId) {
      navigate("/blog");
    }
  }, [post, postId, navigate]);

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold">DBDDAK</div>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/blog" className="hover:underline">Blog</Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button 
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Posts
          </Button>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 md:h-96 bg-gray-200">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center text-gray-500 mb-6">
                <div className="flex items-center mr-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">5 min read</span>
                </div>
              </div>

              <div className="border-l-4 border-blue-600 pl-4 mb-8 italic bg-blue-50 py-3 pr-3">
                <p>{post.excerpt}</p>
              </div>
              
              <div 
                className="prose prose-blue max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <Separator className="my-8" />
              
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-lg mb-2">Social Media Highlight</h3>
                <p className="italic text-gray-700 mb-4">"{post.socialSnippet}"</p>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" /> Share This Post
                  </Button>
                </div>
              </div>
              
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Call to Action</h3>
                <p className="mb-4">{post.callToAction}</p>
                <div className="flex justify-end">
                  <Button variant="secondary">
                    <MessageSquare className="w-4 h-4 mr-2" /> Join the Discussion
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {relatedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogPost key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
