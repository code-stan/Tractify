import "./style.scss";
import footerList from "./data";

const Footer = () => {
	return (
		<footer className="footer">
			{footerList.map((section, index) => (
				<div key={index} className="col">
					<h2>{section.title}</h2>
					<ul className="footer-list">
						{section.links.map((link, linkIndex) => (
							<li key={linkIndex}>{link}</li>
						))}
					</ul>
				</div>
			))}
		</footer>
	);
};

export default Footer;
