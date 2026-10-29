import { Container, Logo, LogoutBtn } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);

  const Navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 py-2 font-sans shadow-sm backdrop-blur">
      <Container>
        <nav className="flex min-h-14 flex-wrap items-center gap-3">
          <div className="mr-auto">
            <Link to="/">
              <Logo width="70px"></Logo>
            </Link>
          </div>
          <ul className="ml-auto flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => Navigate(item.slug)}
                    className="inline-block rounded-full px-3 py-2 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 sm:px-4"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
