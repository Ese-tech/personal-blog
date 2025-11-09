export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted">
        <div>© {new Date().getFullYear()} LumaPress — Where your words shine bright.</div>
        <div className="mt-2">Built with care • Minimal • Feminine • Modern</div>
      </div>
    </footer>
  );
}
