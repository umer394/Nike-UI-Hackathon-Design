"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { TrackingData } from "@/components/data/type";

function TrackShipment() {
  const [labelId, setLabelId] = useState(""); // State for labelId input
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null); // State for tracking data
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [error, setError] = useState<string | null>(null); // State for error messages

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLabelId = searchParams?.get("labelId") || ""; // Safely fetch labelId

  // Automatically fetch tracking data if labelId is present in query params
  useEffect(() => {
    if (queryLabelId) {
      setLabelId(queryLabelId);
      handleSubmit(queryLabelId);
    }
  }, [queryLabelId]);

  // Function to handle form submission
  const handleSubmit = async (labelId: string) => {
    if (!labelId) {
      setError("Label ID is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      router.replace(`/tracking?labelId=${labelId}`);
      const response = await axios.get(`/api/shipengine/tracking/${labelId}`);
      setTrackingData(response.data);
    } catch (err) {
      console.error("Error tracking shipment:", err);
      setError("Failed to track shipment. Please check the label ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="my-20">
        <div className="flex flex-col justify-center items-center max-w-lg mx-auto">
          <Image src={"/header/nike.png"} alt="Nike Logo" width={65} height={35} />
          <div className="items-center justify-center flex flex-col">
            <h1 className="font-bold text-xl">Track Your Shipment</h1>
            <h1 className="max-w-[300px] my-4 text-sm text-center">
              Enter your tracking or label ID below to view the status of your shipment.
            </h1>
          </div>
          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(labelId);
            }}
            className="flex flex-col justify-center items-center gap-4 mt-3"
          >
            <Input
              type="text"
              placeholder="Label ID"
              className="w-80"
              value={labelId}
              onChange={(e) => setLabelId(e.target.value)}
              required
            />
            <Button type="submit" className="w-80 rounded-sm my-4" disabled={loading}>
              {loading ? "Tracking..." : "Track Shipment"}
            </Button>
          </form>
          {/* Error Message */}
          {error && (
            <div className="w-80 mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}
          {/* Tracking Details */}
          {trackingData && (
            <div className="w-80 mt-6 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-2 text-center">Tracking Details</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Tracking Number:</span>{" "}
                  {trackingData.trackingNumber}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {trackingData.statusDescription}
                </p>
                <p>
                  <span className="font-semibold">Carrier Status:</span>{" "}
                  {trackingData.carrierStatusDescription || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Estimated Delivery:</span>{" "}
                  {trackingData.estimatedDeliveryDate || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Actual Delivery:</span>{" "}
                  {trackingData.actualDeliveryDate || "N/A"}
                </p>
              </div>
            </div>
          )}
          <p className="text-[#BCBCBC] text-[12px] mt-4">
            Need help? <Link href={"/help"}><u className="text-black">Contact Support</u></Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackShipment />
    </Suspense>
  );
}
