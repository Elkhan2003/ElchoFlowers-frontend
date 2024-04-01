import { FC } from "react";
import scss from "./ControlPanel.module.scss";

const ControlPanel: FC = () => {
	return (
		<>
			<div className={scss.ControlPanel}>
				<div className="container">
					<div className={scss.content}>
						<h1>ControlPanel</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default ControlPanel;
