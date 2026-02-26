const ProgressCircle = ({ percentage}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative h-[50px] w-[50px] rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(#4F46E5 ${percentage * 3.6}deg, #395a9c 0deg)`,
        }}
      >
        {/* Inner White Circle */}
        <div className="h-[55px] w-[55px] bg-white rounded-full flex items-center justify-center">
          <span className="font-semibold text-indigo-600">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;