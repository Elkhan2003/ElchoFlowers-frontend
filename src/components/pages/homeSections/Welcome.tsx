import { FC } from "react";
import scss from "./Welcome.module.scss";
import girl from "@/src/assets/girl.png";
import AnimatedNumbers from "@/src/components/framerMotion/AnimatedNumbers";
import { Link } from "react-router-dom";

const Welcome: FC = () => {
	return (
		<>
			<section className={scss.Welcome}>
				<div className="container">
					<div className={scss.content}>
						<div className={scss.left}>
							<h1 className={scss.title}>
								Explore the future of the <span>ElchoFlowers</span>
							</h1>
							<p className={scss.text}>
								Let's explore and create your experience with ElchoFlowers.
							</p>
							<div className={scss.buttons}>
								<Link to={"/dashboard"} className={scss.bg}>
									Get Started
								</Link>
								<Link to={"/dashboard"} className={scss.no_bg}>
									Explore Now
								</Link>
							</div>
							<div className={scss.stats}>
								<div className={scss.stat}>
									<h3>
										<AnimatedNumbers value={290} />
										K+
									</h3>
									<p>Requests</p>
								</div>
								<div className={scss.stat}>
									<h3>
										<AnimatedNumbers value={40} />
										K+
									</h3>
									<p>Users</p>
								</div>
								<div className={scss.stat}>
									<h3>
										<AnimatedNumbers value={72} />
										K+
									</h3>
									<p>Requests per day</p>
								</div>
							</div>
						</div>
						<div className={scss.right}>
							<img className={scss.girl_photo} src={girl} alt="girl" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Welcome;
