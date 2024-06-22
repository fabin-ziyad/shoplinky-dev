import { useState, useEffect } from "react";
import { getOneStoreContent, getStoreContents } from "@/services/store/content";
import { usePathname } from "next/navigation";
import { getStoreName, getLastParams } from "@/utils/common";
import { toast } from "react-toastify";

export interface PostCardProps {
  image: string;
  title: string;
  content: string;
  slug: string;
}

export interface Post {
  name: string;
  description: string;
  slug: string;
  image: string;
}

export const useStorePosts = () => {
  const path = usePathname();
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const store = getStoreName(path);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getStoreContents(store);
        if (response.success) {
          setLoading(false);
          setPosts(response?.data?.data);
        } else {
          setLoading(false);
          toast.error(response.error);
        }
      } catch (error) {
        toast.error("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    if (posts.length == 0) {
      fetchPosts();
    }
  }, [path]);

  return { posts, postsLoading:loading, error };
};

export const useFetchContentData = () => {
  const path = usePathname();
  const [content, setContent] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [getUserName, setUserName] = useState<any>(null);
  const store = getStoreName(path);
  const contentId = getLastParams(path);
  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await getOneStoreContent(store, contentId);
        if (response.success) {
          setContent(response.data?.data);
          setUserName(response?.data?.data?.user);
        } else {
          toast.error(response.error);
        }
      } catch (error) {
        toast.error("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (content.length == 0) {
      getContent();
    }
  }, [path]);

  return { content, loading, error, store, getUserName };
};
