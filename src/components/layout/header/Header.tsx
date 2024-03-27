import { Button } from "antd";
import scss from "./Header.module.scss";
import { useGetMeQuery } from "@/src/redux/api/me";
import { Link, useLocation } from "react-router-dom";
import { IconLogo } from "@/src/assets/icons";
import { useEffect, useState } from "react";

const links = [
	{
		name: "Главный",
		href: "/",
	},
	{
		name: "Admin",
		href: "/admin",
	},
];

const Header = () => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const { data } = useGetMeQuery();
	const { pathname } = useLocation();

	useEffect(() => {
		const changeHeader = () => {
			if (window.scrollY >= 10) {
				setHeaderScroll(true);
			} else {
				setHeaderScroll(false);
			}
		};

		changeHeader();
		window.addEventListener("scroll", changeHeader);

		return () => {
			window.removeEventListener("scroll", changeHeader);
		};
	}, []);

	const GoogleLogin = () => {
		window.open(
			`${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth/login/google`,
			"_self"
		);
	};

	const GitHubLogin = () => {
		window.open(
			`${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth/login/github`,
			"_self"
		);
	};

	const logout = () => {
		window.open(
			`${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/auth/logout`,
			"_self"
		);
	};

	return (
		<>
			<header className={scss.Header}>
				<div
					className={
						headerScroll ? `${scss.scroll} ${scss.active}` : `${scss.scroll}`
					}>
					<div className="container">
						<div className={scss.content}>
							<div className={scss.left}>
								<div className={scss.logo}>
									<IconLogo />
								</div>
							</div>
							<div className={scss.right}>
								<nav className={scss.nav_desktop}>
									<ul>
										{links.map((item, index) => (
											<li key={index + 1}>
												<Link
													to={item.href}
													className={
														item.href === pathname
															? `${scss.link} ${scss.active}`
															: `${scss.link}`
													}>
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</nav>
								<div className={scss.auth_buttons}>
									{data?.success ? (
										<>
											<h1 className={scss.user_name}>
												{data?.user.firstName} {data?.user.lastName}
											</h1>
											<p className={scss.user_login}>{data?.user.login}</p>
											<Button onClick={logout}>logout</Button>
										</>
									) : (
										<>
											<Button onClick={GoogleLogin} type="primary">
												GoogleAuth
											</Button>
											<Button onClick={GitHubLogin} type="primary">
												GitHubAuth
											</Button>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
