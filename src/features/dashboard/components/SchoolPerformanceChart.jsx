import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useSelector } from "react-redux";
import { selectMonthlyTrend } from "../../attendance/store/attendanceSlice";

export default function SchoolPerformanceChart({ title }) {
  // monthlyTrend shape: [{ month, present, absent, late }]
  const data = useSelector(selectMonthlyTrend);
  return (
    <div className="bg-white rounded-xl sm:p-5 p-0  shadow-md">
            <h2 className="text-xl font-bold p-[20px]">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEC93B" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FEC93B" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={true} horizontal={false} stroke="#e5e7eb" />

          <XAxis dataKey="month" />
          <YAxis unit="%" />
          <Tooltip formatter={(val) => `${val}%`} />
          <Legend />

          {/* Present % area */}
          <Area
            type="monotone"
            dataKey="present"
            name="Present %"
            stroke="#FEC93B"
            fill="url(#colorPresent)"
            strokeWidth={3}
          />

          {/* Absent % area */}
          <Area
            type="monotone"
            dataKey="absent"
            name="Absent %"
            stroke="#FF6B6B"
            fill="url(#colorAbsent)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
