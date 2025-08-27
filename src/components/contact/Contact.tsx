import CopySplit from "../CopySplit";
import "./style.scss";

const Contact = () => {
	return (
		<section className="contact-section">
			<div className="contact">
				<CopySplit>
					<h2>Ready to practice more law?</h2>
				</CopySplit>
				<CopySplit>
					<button>
						Book a demo
						<img src="./little-black-right-arr.svg" alt="" />
					</button>
				</CopySplit>
			</div>
		</section>
	);
};

export default Contact;
