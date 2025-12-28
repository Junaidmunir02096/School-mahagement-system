import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", thisWeek: 75, lastWeek: 95 },
  { day: "Tue", thisWeek: 50, lastWeek: 40 },
  { day: "Wed", thisWeek: 65, lastWeek: 70 },
  { day: "Thu", thisWeek: 40, lastWeek: 45 },
  { day: "Fri", thisWeek: 25, lastWeek: 20 },
  { day: "Sat", thisWeek: 90, lastWeek: 80 },
  { day: "Sun", thisWeek: 70, lastWeek: 60 },
];

// Custom Tooltip UI
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="bg-[#3E37A4] text-white px-4 py-2 rounded-lg shadow-md text-center">
        <p className="font-bold text-lg">{value}%</p>
        <p className="text-sm">{value * 12} Income</p>
      </div>
    );
  }
  return null;
};

export default function SchoolFinanceChart() {
  return (
    <div className="bg-white rounded-xl p-[20px] shadow-md">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="text-xl font-bold mb-4">School Finance</h2>

        {/* Legend */}
        <div className="flex gap-[20px]">
          <div className="flex flex-col items-center gap-[10px]">
            <span>This Week</span>
            <span className="font-bold text-[#3E37A4] ml-1 text-[18px] font-[700]">1.245</span>
          </div>

          <div className="flex flex-col items-center gap-[10px]">
            <span> <span className="text-[#3E37A4] rounded-full p-[2px] bg-yellow-500"></span>Last Week</span>
            <span className="font-bold text-[#3E37A4] ml-1 text-[18px] font-[700]">1.356</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#e5e7eb" vertical={false} />

          <XAxis dataKey="day" tick={{ fill: "#666" }} />
          <YAxis />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

          {/* Yellow Bar */}
          <Bar
            dataKey="thisWeek"
            fill="#FEC93B"
            radius={[10, 10, 0, 0]}
            barSize={25}
          />

          {/* Red Bar */}
          <Bar
            dataKey="lastWeek"
            fill="#FF6B6B"
            radius={[10, 10, 0, 0]}
            barSize={25}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
