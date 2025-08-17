import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Loading from "../../Loading/Loading";
import Aos from "aos";
import useAxiosSecure from "../../../Hook/UseAxiosSecure";

const HomepageFeedback = () => {
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    Aos.init({ duration: 2000, once: false });
  }, []);
  const {
    data: feedbacks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homepage-feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedback");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <div className="text-center text-red-500 py-10">
        Error loading feedbacks!
      </div>
    );

  return (
    <div data-aos="fade-up"
      data-aos-anchor-placement="top-bottom" className="py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {feedbacks.slice(0, 6).map((fb, idx) => (
          <div
            key={fb._id || idx}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-base-200 rounded-xl p-5 shadow-md hover:shadow-xl hover:scale-102 transition-all"
          >
            <div className="flex items-center gap-2 text-yellow-500 mb-2">
              {[...Array(fb.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
              <span className="text-gray-600 ml-2 text-sm">
                {new Date(fb.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{fb.feedback}</p>
            <p className="text-sm text-right text-gray-500 italic">
              — {fb.participant_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomepageFeedback;
