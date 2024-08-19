import AddPost from "@/components/post/add-post";
import DeletePost from "@/components/post/delete-post";
import EditPost from "@/components/post/edit-post";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostResponse } from "@/utils/model/post-model";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  const response = await res.json();
  const posts = response.data;

  return {
    props: {
      posts,
    },
  };
}) satisfies GetServerSideProps<{ posts: PostResponse[] }>;

export default function Home({ posts }: { posts: PostResponse[] }) {
  return (
    <main className="h-screen w-full">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 items-start gap-8 p-8 sm:grid-cols-2 xl:grid-cols-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <EditPost postId={post.id} />
                <DeletePost postId={post.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold">No posts found</h1>
          <AddPost />
        </div>
      )}
    </main>
  );
}
