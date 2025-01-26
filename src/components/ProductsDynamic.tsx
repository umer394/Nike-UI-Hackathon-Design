"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/context";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useState, FormEvent } from "react";

interface Products {
    _id: string;
    id: string;
    name: string;
    inventory: number;
    price: number;
    status: string;
    category: string;
    size: string[];
    colors: string[];
    image: string;
}

interface Review {
    text: string;
    rating: number;
}

export default function ProductDetails({ product }: { product: Products[] }) {
    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [reviews, setReviews] = useState<Review[]>([]);
    const { addToCart, addToWishlist } = useCart();

    useEffect(() => {
        const savedReviews = localStorage.getItem(`reviews-${product[0]?._id}`);
        setReviews(savedReviews ? JSON.parse(savedReviews) : []);
    }, [product]);

    const handleRating = (selectedRating: number) => setRating(selectedRating);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!comment.trim() || rating === 0) return alert("Please add both a review and a rating.");
        
        const newReview: Review = { text: comment, rating };
        const updatedReviews = [...reviews, newReview];

        localStorage.setItem(`reviews-${product[0]?._id}`, JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setComment("");
        setRating(0);
    };

    return (
        <>
            {product.map((data) => (
                <div key={data._id}>
                    <div className="md:flex md:space-x-10 lg:space-x-40">
                        <Image src={urlFor(data.image).width(500).url()} alt={data.name} width={500} height={500} />
                        <div>
                            <h1 className="text-xl md:text-4xl">{data.name}</h1>
                            <h2 className="text-lg text-[#757575]">{data.category}</h2>
                            <h1 className="text-lg font-semibold mt-10">MRP: $ {data.price}</h1>

                            <section>
                                <h1 className="font-semibold text-sm">Select Size</h1>
                                <div className="grid grid-cols-3 gap-2">
                                    {data.size.map((sizes, index) => (
                                        <Button key={index} className="border">{sizes}</Button>
                                    ))}
                                </div>

                                <h1 className="font-semibold text-sm">Select Color</h1>
                                <div className="flex gap-2">
                                    {data.colors.map((color, index) => (
                                        <Button key={index} className="border">{color}</Button>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <Button onClick={() => addToWishlist(data)} className="border">
                                        <Image src={"/header/heart.png"} alt="heart" width={24} height={24} />
                                    </Button>
                                    <Button onClick={() => addToCart(data)} className="border">
                                        <Image src={"/header/cart.png"} alt="cart" width={24} height={24} />
                                    </Button>
                                </div>

                                <Button className="bg-black text-white mt-4 w-72 md:w-96 rounded-full h-14">
                                    Proceed To Checkout
                                </Button>
                            </section>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h1 className="font-semibold text-2xl">Add Reviews</h1>
                        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." className="border p-2 w-full"/>
                        
                        <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => handleRating(star)} className={rating >= star ? "text-yellow-500" : "text-gray-400"}>
                                    ★
                                </button>
                            ))}
                        </div>
                        
                        <Button onClick={handleSubmit} className="mt-2">Submit Review</Button>

                        <div className="mt-5">
                            <h1 className="font-semibold text-xl">Customer Reviews</h1>
                            {reviews.length === 0 ? (
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            ) : (
                                reviews.map((review, index) => (
                                    <div key={index} className="mt-2 p-2 border rounded-md">
                                        <p className="text-lg">{review.text}</p>
                                        <div className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
