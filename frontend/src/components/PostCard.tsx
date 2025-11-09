import Link from "next/link";

type Props = {
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  slug?: string;
};

export default function PostCard({ title, excerpt, author, date, slug }: Props) {
  return (
    <article className="card mb-6">
      <Link href={slug ? `/post/${slug}` : '#'}>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      </Link>
      <p className="muted mb-3">{excerpt}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="text-muted">{author ?? 'Unknown'}</div>
        <div className="text-muted">{date ?? ''}</div>
      </div>
    </article>
  );
}
