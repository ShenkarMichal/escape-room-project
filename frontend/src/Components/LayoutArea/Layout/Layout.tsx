import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header>
                <Header />
            </header>
            <main>
                <Main />
            </main>
            <aside>
                <Aside />
            </aside>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
