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
    <header className="py-2 font-sans font-semibold shadow bg-[#A2D2FF]">
      <Container>
        <nav className="flex">
          <div className="mr-4 ">
            <Link to="/">
              <Logo width="70px"></Logo>
            </Link>
          </div>
          <ul className="flex ml-auto gap-1.5 ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => Navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-[#FFC8DD] focus:ring focus:ring-[#FFAFCC] rounded-full"
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
