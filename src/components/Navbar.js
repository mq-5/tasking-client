/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
	Button,
	Collapse,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container
} from "reactstrap";
import logout from './LogOut'


function IndexNavbar(props) {
	const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
	const [navbarCollapse, setNavbarCollapse] = React.useState(false);

	const toggleNavbarCollapse = () => {
		setNavbarCollapse(!navbarCollapse);
		document.documentElement.classList.toggle("nav-open");
	};

	React.useEffect(() => {
		const updateNavbarColor = () => {
			if (
				document.documentElement.scrollTop > 299 ||
				document.body.scrollTop > 299
			) {
				setNavbarColor("");
			} else if (
				document.documentElement.scrollTop < 300 ||
				document.body.scrollTop < 300
			) {
				setNavbarColor("navbar-transparent");
			}
		};

		window.addEventListener("scroll", updateNavbarColor);

		return function cleanup() {
			window.removeEventListener("scroll", updateNavbarColor);
		};
	}
	);

	return (
		<Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
			<Container>
				<div className="navbar-translate">
					<NavbarBrand
						data-placement="bottom"
						href="/"
					>
						Tasking
          </NavbarBrand>
					<button
						aria-expanded={navbarCollapse}
						className={classnames("navbar-toggler navbar-toggler", {
							toggled: navbarCollapse
						})}
						onClick={toggleNavbarCollapse}
					>
						<span className="navbar-toggler-bar bar1" />
						<span className="navbar-toggler-bar bar2" />
						<span className="navbar-toggler-bar bar3" />
					</button>
				</div>
				<Collapse
					className="justify-content-end"
					navbar
					isOpen={navbarCollapse}
				>
					<Nav navbar>
						<NavItem>
							<NavLink
								href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-index-navbar"

							>
								<i className="nc-icon nc-book-bookmark" /> Documentation
							</NavLink>
						</NavItem>
						{props.token ? <>
							<NavItem>
								<Button
									className="btn-round"
									color="secondary"
									onClick={() => logout(props.token, props.URL)}
								>
									Log Out
              </Button>
							</NavItem>
						</>
							:
							<>
								<NavItem>
									<Button
										className="btn-round"
										color="danger"
										href="/register"
									>
										Sign Up
              </Button>
								</NavItem>
								<NavItem>
									<Button
										className="btn-round"
										color="secondary"
										href="/login"
									>
										Log In
              </Button>
								</NavItem>
							</>}
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
}

export default IndexNavbar;
