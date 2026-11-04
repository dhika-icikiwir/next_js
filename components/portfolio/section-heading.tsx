export function SectionHeading({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <h2 id={id} className="font-serif text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-3 text-muted-foreground">{lead}</p>}
    </div>
  );
}
