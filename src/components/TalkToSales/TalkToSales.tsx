import "./style.scss";
import CopySplit from "../CopySplit";

const TalkToSales = () => {
	return (
		<section className="talk-to-sales">
			<img src="./what-it-solves-stars.svg" alt="" width={273} height={273} className="stars" />
			<div className="title-container">
				<CopySplit>
					<h2>How It Works</h2>
				</CopySplit>
			</div>
			<div className="heading-wrapper">
				<div className="heading-container">
					<CopySplit>
						<h3>For solo lawyers and full-scale firms.</h3>
					</CopySplit>
					<CopySplit>
						<p>Whether you’re flying solo or managing a growing legal team, Tractify adapts to your workflow, scales with your growth, and keeps everything compliant.</p>
					</CopySplit>
				</div>
				<div className="button-container">
					<button>
						<div>Talk to sales</div>
						<img src="./little-right-arrow.svg" alt="" width={11} height={11} />
					</button>
				</div>
			</div>
		</section>
	);
};

export default TalkToSales;
