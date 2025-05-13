
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogPost as BlogPostType } from "@/data/BlogData";

interface BlogPostProps {
  post: BlogPostType;
  featured?: boolean;
}

const BlogPost = ({ post, featured = false }: BlogPostProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${featured ? 'lg:flex' : ''}`}>
      <div className={`${featured ? 'lg:w-2/5' : 'w-full'} h-48 bg-gray-200`}>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`p-6 ${featured ? 'lg:w-3/5' : ''}`}>
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>Week {post.week}</span>
        </div>
        
        <h3 className={`font-bold mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          <Link to={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link 
          to={`/blog/${post.id}`}
          className="inline-block text-blue-600 font-medium hover:text-blue-800"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
