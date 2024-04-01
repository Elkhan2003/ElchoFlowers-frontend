import scss from "./LayoutPage.module.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import HomePage from "@/src/components/pages/HomePage";
import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/src/redux/api/me";
import AdminPage from "../pages/AdminPage";

const LayoutPage = () => {
	const [isPreLoader, setIsPreLoader] = useState(true);
	const { status } = useGetMeQuery();

	useEffect(() => {
		if (status === "fulfilled" || status === "rejected") {
			setIsPreLoader(false);
		}
	}, [status]);

	return (
		<>
			{isPreLoader ? (
				<>
					<h1 className={scss.pre_loader}>Loading...</h1>
				</>
			) : (
				<>
					<div className={scss.layout}>
						<Header />
						<main>
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route path="/admin" element={<AdminPage />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</>
			)}
		</>
	);
};
export default LayoutPage;
