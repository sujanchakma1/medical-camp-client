import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";

const FeedbackForm = ({ campId, participantId, onSubmitted }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const [submitting, setSubmitting] = useState(false);
  const {user} = useAuth()

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const feedbackData = {
        camp_id: campId,
        participant_id: participantId,
        rating: parseInt(data.rating),
        participant_name : user?.displayName,
        feedback: data.feedback,
        date: new Date(),
      };

      const res = await axiosSecure.post("/feedback", feedbackData);

      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Feedback submitted successfully.", "success");
        reset();
        if (onSubmitted) onSubmitted();
      }
    } catch (error) {
      Swal.fire("Error", "Could not submit feedback.", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl text-center font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Rating (1-5)</label>
          <select
            {...register("rating", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Feedback</label>
          <textarea
            {...register("feedback", { required: true })}
            className="w-full border border-gray-300 p-2 rounded"
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
