import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarOutlineIcon from "@material-ui/icons/StarOutline";

export default function StarRating(props) {
	const { rating } = props;

	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	const stars = [];

	// Add full stars
	for (let i = 0; i < fullStars; i++) {
		stars.push(<StarIcon />);
	}

	// Add half star
	if (hasHalfStar) {
		stars.push(<StarHalfIcon />);
	}

	// Add empty stars
	const emptyStars = 5 - stars.length;
	for (let i = 0; i < emptyStars; i++) {
		stars.push(<StarOutlineIcon />);
	}

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			{stars}{" "}
			<span
				style={{
					color: "white",
					marginLeft: "10px",
					background: "green",
					padding: "2px 5px",
					borderRadius: "4px",
				}}
			>
				{rating}
			</span>
		</div>
	);
}
