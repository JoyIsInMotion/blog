export function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur md:p-10">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">About</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">A simple blog shell with auth-gated author tools.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
        This app gives readers a public home page and post detail route, while authenticated users get protected screens for creating, editing, and deleting posts. The backend wiring can be added later without changing the route structure.
      </p>
    </section>
  )
}