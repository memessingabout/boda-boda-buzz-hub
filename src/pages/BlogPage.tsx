import { useState } from "react";
import { blogPosts } from "@/data/BlogData";
import BlogPost from "@/components/BlogPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique tags across all blog posts
  const allTags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts based on search and tag filters
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Toggle tag selection
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center mb-8">
            <div className="text-2xl font-bold">DBDDAK</div>
            <div className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/blog" className="hover:underline">Blog</a>
            </div>
          </nav>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">DBDDAK Blog</h1>
            <p className="text-xl opacity-90">
              Insights, stories, and resources for Kenya's digital boda boda community
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Search and filter section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              variant="outline"
              onClick={clearFilters}
              className={`whitespace-nowrap ${!searchTerm && !selectedTag ? 'opacity-50' : ''}`}
              disabled={!searchTerm && !selectedTag}
            >
              Clear Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge 
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-16">
          {/* Featured post (first one) */}
          {filteredPosts.length > 0 && (
            <BlogPost post={filteredPosts[0]} featured={true} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Rest of the posts */}
          {filteredPosts.slice(1).map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium text-gray-600 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
