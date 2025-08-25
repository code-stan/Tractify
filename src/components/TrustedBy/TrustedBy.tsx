import CopySplit from "../CopySplit";
import "./style.scss";

const TrustedBy = () => {
	const trustedCompanies = [
		{ name: "Bears", src: "/trusted-by/bears.svg", width: "4rem", height: "2rem" },
		{ name: "Ipsum", src: "/trusted-by/ipsum.svg", width: "17rem", height: "4rem" },
		{ name: "Labor Attorney", src: "/trusted-by/labor-attorney.svg", width: "23.2rem", height: "4rem" },
		{ name: "Logo", src: "/trusted-by/logo.svg", width: "4rem", height: "4rem" },
		{ name: "Noire Vom", src: "/trusted-by/noire-vom.svg", width: "17.9rem", height: "3.8rem" },
		{ name: "Optimus Bank", src: "/trusted-by/optimus-bank.svg", width: "21.4rem", height: "4rem" },
		{ name: "Spring Lab", src: "/trusted-by/spring-lab.svg", width: "16.7rem", height: "4rem" },
	];

	return (
		<section className="trusted-by">
			<div className="title-container">
				<CopySplit>
					<h2>Trusted by</h2>
				</CopySplit>
			</div>

			<div className="marquee-container">
				<div className="marquee-track">
					{trustedCompanies.map((company, index) => (
						<div key={`first-${index}`} className="marquee-item">
							<img
								src={company.src}
								alt={company.name}
								width={company.width}
								height={company.height}
								style={{
									width: company.width,
									height: company.height,
								}}
							/>
						</div>
					))}
					{trustedCompanies.map((company, index) => (
						<div key={`second-${index}`} className="marquee-item">
							<img
								src={company.src}
								alt={company.name}
								width={company.width}
								height={company.height}
								style={{
									width: company.width,
									height: company.height,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TrustedBy;
