import Logo from "../components/Logo";

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <Logo width="100px" />
        <p className="text-center text-sm text-slate-500">
          Share your ideas. Read something inspiring.
        </p>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Blogspace</p>
      </div>
    </footer>
  );
}

export default Footer;
