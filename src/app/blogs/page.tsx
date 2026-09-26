import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogs } from "../lib/blog";

export const metadata: Metadata = {
  title: "Blogs | impkar",
};

function Blogs() {
  const blogs = getBlogs();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-8 lg:py-16">
      <Link className="inline-flex items-center gap-2 text-lg" href="/">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M13 8H3M7 4 3 8l4 4" />
        </svg>
        <span className="underline-hover">Home</span>
      </Link>
      <header className="mt-8 flex items-baseline justify-between gap-4 lg:mt-12">
        <h1 className="text-4xl font-light lg:text-6xl">Blogs</h1>
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          {blogs.length} {blogs.length === 1 ? "post" : "posts"}
        </span>
      </header>

      {/* a third column only once there are enough posts to fill it */}
      <ul
        className={`mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 ${blogs.length >= 3 ? "lg:grid-cols-3" : ""}`}
      >
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-[#F9F9F9] shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-neutral-800 dark:bg-[#0d0d0d] dark:focus-visible:outline-[#ffcc66]"
            >
              {/* posts without an image get a same-size placeholder so cards in a row line up */}
              {blog.cover ? (
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200 dark:bg-neutral-900">
                  {/* decorative: the title below already names the post */}
                  <Image
                    fill
                    src={blog.cover.src}
                    alt=""
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="grid aspect-[16/9] place-items-center bg-neutral-200 dark:bg-neutral-900"
                >
                  <span className="text-3xl font-light capitalize text-neutral-400 dark:text-neutral-600">
                    {blog.category ?? "Blog"}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                  {blog.category && <>{blog.category} · </>}
                  {blog.readingMinutes} min read
                </span>
                <h2 className="text-xl leading-snug text-pretty">
                  {blog.title}
                </h2>
                <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {blog.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium">
                  Read post
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Blogs;
