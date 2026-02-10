import { useState } from "react";
import Pagination from "../commonComponent/Pagination";



const SchoolExpense = () => {
        const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock expense data
    const expenseData = [
        { id: '#123456789', date: '2 March 2021, 13:45 PM', amount: 50036, status: 'Complete' },
        { id: '#123456789', date: '2 March 2021, 13:45 PM', amount: 50036, status: 'Pending' },
        { id: '#123456789', date: '2 March 2021, 13:45 PM', amount: 50036, status: 'Canceled' },
        { id: '#123456789', date: '2 March 2021, 13:45 PM', amount: 50036, status: 'Complete' },
        { id: '#123456789', date: '2 March 2021, 13:45 PM', amount: 50036, status: 'Complete' },
        { id: '#123456789', date: '2 March 2021, 13:45 PM', amount: 50036, status: 'Complete' },
        // Add more items to test pagination
        { id: '#123456790', date: '3 March 2021, 14:30 PM', amount: 45000, status: 'Pending' },
        { id: '#123456791', date: '4 March 2021, 09:15 AM', amount: 60000, status: 'Complete' },
    ];

    const totalItems = expenseData.length; 
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentExpenses = expenseData.slice(startIndex, startIndex + itemsPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Complete':
                return 'text-[#4CBC9A]';
            case 'Pending':
                return 'text-[#A098AE]';
            case 'Canceled':
                return 'text-[#FB7D5B]';
            default:
                return 'text-[#A098AE]';
        }
    };
    return(
         <div className="flex gap-[2rem] mt-[20px]">
                {/* School Expense Component */}
                <div className="bg-[#fff] rounded-[20px] p-[30px] flex-1 shadow-sm">
                    <h2 className="text-[#303972] text-[24px] font-[700] mb-[30px]">School Expense</h2>
                    
                    {/* Expense List */}
                    <div className="flex flex-col gap-[20px]">
                        {currentExpenses.map((expense, index) => (
                            <div key={index} className="flex items-center justify-between">
                                {/* Left side - Icon and Transaction Info */}
                                <div className="flex items-center gap-[15px]">
                                    <div className="bg-[#FB7D5B] rounded-full w-[52px] h-[52px] flex items-center justify-center flex-shrink-0">
                                        {/* <FontAwesomeIcon icon={faTrendingUp} className="text-white text-[20px]" /> */}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[#303972] text-[16px] font-[600]">{expense.id}</p>
                                        <p className="text-[#A098AE] text-[12px]">{expense.date}</p>
                                    </div>
                                </div>

                                {/* Right side - Amount and Status */}
                                <div className="flex items-center gap-[30px]">
                                    <p className="text-[#303972] text-[16px] font-[600]">$ {expense.amount.toLocaleString()}</p>
                                    <p className={`text-[16px] font-[600] w-[90px] text-right ${getStatusColor(expense.status)}`}>
                                        {expense.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
    )
}

export default SchoolExpense;