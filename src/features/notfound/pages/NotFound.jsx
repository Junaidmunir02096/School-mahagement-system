import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(160deg, #f8f7ff 0%, #ece9ff 50%, #f2f5ff 100%)" }}>
      <div className="max-w-xl w-full bg-white/90 backdrop-blur rounded-3xl shadow-xl border border-[#d9d6f5] p-10 text-center">
        <p className="text-sm font-semibold tracking-widest text-[#4D44B5] mb-4">ERROR 404</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1040] mb-4" style={{ fontFamily: "Sora, sans-serif" }}>
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The route you entered does not exist. Please check the URL or go back to a valid page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl text-white font-semibold transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #4D44B5, #7C74D8)" }}
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl font-semibold border border-[#c9c5ef] text-[#4D44B5] hover:bg-[#f4f2ff] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
