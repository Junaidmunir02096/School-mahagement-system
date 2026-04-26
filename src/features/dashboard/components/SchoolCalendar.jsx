// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const dates = [
//   { day: 31, faded: true },
//   { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
//   { day: 7, red: true },
//   { day: 8, selected: "blue" },
//   { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
//   { day: 14, red: true },
//   { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 },
//   { day: 20, selected: "yellow" },
//   { day: 21, red: true },
//   { day: 22 },
//   { day: 23, selected: "orange" },
//   { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
//   { day: 28, red: true },
//   { day: 29 }, { day: 30 }, { day: 31 },
//   { day: 1, faded: true }, { day: 2, faded: true }, { day: 3, faded: true },
// ];

// export default function SchoolCalendar() {
//   return (
//     <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-md">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-bold text-[#2C2F7E]">
//           School Calendar
//         </h2>
//         <span className="text-sm text-gray-500 flex items-center gap-1">
//           March 2021
//           <span className="text-xs">▼</span>
//         </span>
//       </div>

//       {/* Days */}
//       <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
//         {days.map((day) => (
//           <div key={day}>{day}</div>
//         ))}
//       </div>

//       {/* Dates */}
//       <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
//         {dates.map((date, index) => {
//           let bg = "";
//           let text = "text-[#2C2F7E]";

//           if (date.selected === "blue") bg = "bg-[#5B5BE0] text-white";
//           if (date.selected === "orange") bg = "bg-[#FF7A45] text-white";
//           if (date.selected === "yellow") bg = "bg-[#FEC93B] text-white";
//           if (date.red) text = "text-red-400";
//           if (date.faded) text = "text-gray-300";

//           return (
//             <div key={index} className="flex justify-center">
//               <div
//                 className={`w-9 h-9 flex items-center justify-center rounded-full ${bg} ${text}`}
//               >
//                 {date.day}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          width: '100%',
          maxHeight: '100%',
          '& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
            justifyContent: 'space-around',
          },
        }}
      />
    </LocalizationProvider>
  );
}
