import PostCard from "@/components/PostCard";

export default function Home() {
  const sample = [
    { title: "A Calm Morning Routine", excerpt: "How small rituals help writing flow.", author: "Anna L.", date: "Nov 9, 2025", slug: "calm-morning" },
    { title: "Designing a Minimal Blog", excerpt: "Thoughts on whitespace, typography, and tone.", author: "Luma Team", date: "Oct 28, 2025", slug: "minimal-blog" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 text-center text-textDark">
        <h1 className="text-4xl font-semibold">LumaPress</h1>
        <p className="mt-2 text-muted">Where your words shine bright.</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Latest</h3>
        {sample.map((p) => (
          <PostCard key={p.slug} title={p.title} excerpt={p.excerpt} author={p.author} date={p.date} slug={p.slug} />
        ))}
      </section>
    </div>
  );
}
