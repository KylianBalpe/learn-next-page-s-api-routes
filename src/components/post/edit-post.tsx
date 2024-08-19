import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editPostFormSchema } from "@/utils/form/post-form";
import { Textarea } from "@/components/ui/textarea";
import { PostResponse } from "@/utils/model/post-model";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPost({ postId }: { postId: number }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/posts/${postId}`,
    fetcher,
  );

  if (error) {
    toast({
      variant: "destructive",
      title: error.message,
    });
  }

  const postData = data?.data as PostResponse;

  const form = useForm<z.infer<typeof editPostFormSchema>>({
    resolver: zodResolver(editPostFormSchema),
  });

  async function handleUpdate(values: z.infer<typeof editPostFormSchema>) {
    setIsUpdate(true);
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const response = await res.json();

      if (response.code !== 200) {
        toast({
          variant: "destructive",
          title: response.message,
          duration: 5000,
        });

        return;
      }

      toast({
        title: response.message,
        duration: 5000,
      });
    } catch (error) {
      console.error(error);
      setIsUpdate(false);
    } finally {
      setIsUpdate(false);
      setIsOpen(false);
      router.replace(router.asPath);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil1Icon width={20} height={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Post</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="hidden"></AlertDialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              defaultValue={postData?.title}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" id="title" {...field} />
                  </FormControl>
                  <FormDescription>This is your post title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              defaultValue={postData?.content}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Post content"
                      id="content"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your post content.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  type="submit"
                  disabled={isLoading || isUpdate || !form.formState.isValid}
                >
                  Submit
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
