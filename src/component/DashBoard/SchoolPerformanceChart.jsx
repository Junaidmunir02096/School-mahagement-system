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

const data = [
  { month: "Jan", thisWeek: 10, lastWeek: 20 },
  { month: "Feb", thisWeek: 40, lastWeek: 50 },
  { month: "Mar", thisWeek: 80, lastWeek: 60 },
  { month: "Apr", thisWeek: 20, lastWeek: 10 },
  { month: "May", thisWeek: 10, lastWeek: 15 },
  { month: "Jun", thisWeek: 50, lastWeek: 70 },
  { month: "Jul", thisWeek: 60, lastWeek: 80 },
  { month: "Aug", thisWeek: 30, lastWeek: 25 },
  { month: "Sep", thisWeek: 40, lastWeek: 60 },
  { month: "Oct", thisWeek: 90, lastWeek: 100 },
  { month: "Nov", thisWeek: 70, lastWeek: 85 },
  { month: "Dec", thisWeek: 30, lastWeek: 40 },
];

export default function SchoolPerformanceChart({ title }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-xl font-bold p-[20px]">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEC93B" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FEC93B" stopOpacity={0} />
            </linearGradient>

            {/* Red Gradient */}
            <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
            </linearGradient>
          </defs>
          

          <CartesianGrid vertical={true} horizontal={false} stroke="#e5e7eb" />

          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Smooth areas */}
          <Area
            type="monotone"
            dataKey="thisWeek"
            stroke="#FEC93B"
            fill="url(#colorThisWeek)"
            strokeWidth={3}
          />

          <Area
            type="monotone"
            dataKey="lastWeek"
            stroke="#FF6B6B"
            fill="url(#colorLastWeek)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
