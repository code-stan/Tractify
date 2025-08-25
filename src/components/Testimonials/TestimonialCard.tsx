import "./style.scss";

const TestimonialCard = ({ imgSrc, comment, name, jobTitle }: Record<string, string>) => {
	return (
		<div className="testimonial-card">
			<div className="header">
				<img src={`./${imgSrc}`} alt={name} width={40} height={40} className="profile-img" />
				<p className="comment">{comment}</p>
			</div>
			<div className="author-container">
				<h4>{name}</h4>
				<p>-{jobTitle}</p>
			</div>
		</div>
	);
};

export default TestimonialCard;
