import { useState } from "react";

export const CustomerPage = () => {
  const [feedback, setFeedback] = useState("");
  const [_file, setFile] = useState(null);

  const handleFeedbackChange = (e : any) => {
    setFeedback(e.target.value);
  };

  const handleFileChange = (e : any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    setFeedback("");
    setFile(null);
    alert("Feedback submitted");
  };

  return (
    <div className="context-page">
      <form onSubmit={handleSubmit} className="mt-4 mx-4">
        <label className="text-xl font-bold">
          Please give us any feedback you might have:
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            className="block w-full mt-1 p-2 h-32"
          />
        </label>
        <label className="block mt-4 text-xl font-bold">
          Any file that might help us understand better?:
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full mt-1"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-highlight text-dark px-6 py-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
