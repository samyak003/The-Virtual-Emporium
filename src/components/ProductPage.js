import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { useEffect } from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CurrencyFormat from "react-currency-format";
import firebase from "firebase";
import StarRating from "./StarRating";

function ProductPage() {
	const [{ user }, dispatch] = useStateValue();
	const { productId } = useParams();
	const [product, setProduct] = useState();
	const [review, setReview] = useState("");
	const [status, setStatus] = useState("Loading...");
	const deleteReview = (index) => {
		db.collection("products")
			.doc(productId)
			.update({
				reviews: firebase.firestore.FieldValue.arrayRemove(
					product.reviews[index],
				),
			});
	};
	const submitReview = (event) => {
		event.preventDefault();
		db.collection("products")
			.doc(productId)
			.update({
				reviews: firebase.firestore.FieldValue.arrayUnion({
					name: user.displayName,
					email: user?.email,
					text: review,
				}),
			});
		setReview("");
	};

	useEffect(() => {
		const getProduct = () => {
			if (productId) {
				db.collection("products")
					.doc(productId)
					.onSnapshot((snapshot) => {
						setProduct(snapshot.data());
						if (!snapshot.data()) {
							setStatus("No product found");
						}
					});
			}
		};
		return getProduct();
	});
	const addToBasket = () => {
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: productId,
				title: product.title,
				image: product.image,
				price: product.price,
				rating: product.rating,
			},
		});
	};
	return (
		<section className="productPage">
			{!product ? (
				<h1>{status}</h1>
			) : (
				<>
					<section className="productPage__Top">
						<img className="productPage__image" src={product?.image} alt="" />
						<div className="productPage__info">
							<h2>{product?.title}</h2>
							<CurrencyFormat
								renderText={(value) => (
									<p className="product__price">
										<strong>{value}</strong>
									</p>
								)}
								decimalScale={2}
								value={product?.price}
								displayType="text"
								thousandSeparator={true}
								thousandSpacing="2s"
								prefix={"$"}
							></CurrencyFormat>
							<div className="productPage__rating">
								<StarRating rating={product?.rating} />
							</div>
							<button className="btn" onClick={addToBasket}>
								Add to Basket
							</button>
						</div>
					</section>
					<section className="productPage__featuresSection">
						<p>
							<strong>Delivery in : </strong>
							{product?.eta} minutes
						</p>
						<h2>Features</h2>
						<ul className="productPage__features">
							{product?.features.map((feature, index) => (
								<li key={index} className="productPage__feature">
									{index + 1}) {feature}
								</li>
							))}
						</ul>
					</section>
					<section className="productPage__reviewSection">
						<h2 className="productPage__reviewSection__title">Reviews</h2>
						{product?.reviews.length === 0 ? (
							<p>No reviews available for this product</p>
						) : (
							product?.reviews.map((review, index) => (
								<div key={index} className="productPage__review">
									<div className="productPage__reviewContact">
										<Avatar
											className="post__avatar"
											alt={review.name || review.email}
											src="./fefe"
										></Avatar>
										<p>
											<strong>{review.name || review.email}</strong>
											<br />
											{review.name && (
												<span className="productPage__reviewContact__email">
													{review.email}
												</span>
											)}
										</p>
										{user?.email === review.email && (
											<button
												onClick={() => deleteReview(index)}
												className="btn"
											>
												Delete
											</button>
										)}
									</div>
									<p>{review.text}</p>
								</div>
							))
						)}
						<form className="productPage__reviewForm">
							<input
								type="text"
								maxLength="120"
								value={review}
								onChange={(event) => setReview(event.target.value)}
								placeholder="Write Your Review"
							></input>
							<button
								className="btn"
								disabled={!user || !review}
								onClick={submitReview}
							>
								Submit
							</button>
						</form>
					</section>
				</>
			)}
		</section>
	);
}

export default ProductPage;
