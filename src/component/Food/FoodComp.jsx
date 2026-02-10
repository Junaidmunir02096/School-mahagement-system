import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar, faChartBar, faArrowTrendUp, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Pagination from "../commonComponent/Pagination";

const FoodComp = () => {
    const [activeFilter, setActiveFilter] = useState('All Menus');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock food data
    const foodData = [
        { id: 1, name: 'Beef Steak with Fried Potato', category: 'Lunch', rating: 4.9, orders: 1456, interest: 26, image: '' },
        { id: 2, name: 'Pancake with Honey', category: 'Breakfast', rating: 4.7, orders: 1456, interest: 26, image: '' },
        { id: 3, name: 'Japanese Beef Ramen', category: 'Lunch', rating: 4.8, orders: 1456, interest: 26, image: '' },
        { id: 4, name: 'Mixed Salad', category: 'Lunch', rating: 4.2, orders: 1456, interest: 26, image: '' },
        { id: 5, name: 'Beef Meatball with Vegetable', category: 'Snack', rating: 4.5, orders: 1456, interest: 26, image: '' },
        { id: 6, name: 'Chicken Sandwich', category: 'Breakfast', rating: 4.6, orders: 1234, interest: 28, image: '' },
        { id: 7, name: 'Grilled Fish', category: 'Lunch', rating: 4.8, orders: 1567, interest: 30, image: '' },
        { id: 8, name: 'Fruit Salad', category: 'Snack', rating: 4.3, orders: 987, interest: 22, image: '' },
    ];

    const filteredFood = activeFilter === 'All Menus' 
        ? foodData 
        : foodData.filter(item => item.category === activeFilter);

    const totalItems = filteredFood.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoodItems = filteredFood.slice(startIndex, startIndex + itemsPerPage);

    const getCategoryColor = (category) => {
        switch(category) {
            case 'Lunch':
                return 'bg-[#4D44B5] text-white';
            case 'Breakfast':
                return 'bg-[#4D44B5] text-white';
            case 'Snack':
                return 'bg-[#4D44B5] text-white';
            default:
                return 'bg-[#4D44B5] text-white';
        }
    };
    
    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <div className="flex justify-between items-center">
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Food</h1>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>

            {/* Food Menu Section */}
            <div className="bg-white rounded-[20px] p-[30px] mt-[20px]">
                <div className="flex justify-between items-center mb-[30px]">
                    <h2 className="text-[#303972] text-[24px] font-[700]">Food Menu</h2>
                    
                    {/* Filter Tabs */}
                    <div className="flex gap-[20px] items-center">
                        {['All Menus', 'Breakfast', 'Lunch', 'Snack'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setActiveFilter(filter);
                                    setCurrentPage(1);
                                }}
                                className={`text-[14px] font-[600] pb-[8px] transition-all ${
                                    activeFilter === filter
                                        ? 'text-[#4D44B5] '
                                        : 'text-[#A098AE] border-b-2 border-transparent hover:text-[#4D44B5]'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Food Items List */}
                <div className="flex flex-col gap-[25px]">
                    {currentFoodItems.map((food) => (
                        <div key={food.id} className="flex items-center justify-between">
                            {/* Left Section - Image, Badge, Name */}
                            <div className="flex items-center gap-[20px] flex-1">
                                {/* Image Placeholder */}
                                <div className="w-[90px] h-[90px] bg-[#C1BBEB] rounded-[12px] flex-shrink-0"></div>
                                
                                {/* Name and Badge */}
                                <div className="flex flex-col gap-[10px]">
                                    <span className={`${getCategoryColor(food.category)} px-[16px] py-[6px] rounded-full text-[12px] font-[600] w-fit`}>
                                        {food.category}
                                    </span>
                                    <h3 className="text-[#303972] text-[18px] font-[600]">{food.name}</h3>
                                </div>
                            </div>

                            {/* Right Section - Stats */}
                            <div className="flex items-center gap-[40px]">
                                {/* Rating */}
                                <div className="flex items-center gap-[8px]">
                                    <FontAwesomeIcon icon={faStar} className="text-[#FCC43E] text-[16px]" />
                                    <span className="text-[#303972] text-[16px] font-[600]">{food.rating}</span>
                                </div>

                                {/* Total Orders */}
                                <div className="flex items-center gap-[10px]">
                                    <FontAwesomeIcon icon={faChartBar} className="text-[#4D44B5] text-[20px]" />
                                    <div className="flex flex-col">
                                        <span className="text-[#303972] text-[16px] font-[600]">{food.orders.toLocaleString()}</span>
                                        <span className="text-[#A098AE] text-[12px]">Total Order</span>
                                    </div>
                                </div>

                                {/* Interest */}
                                <div className="flex items-center gap-[10px]">
                                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-[#4D44B5] text-[20px]" />
                                    <div className="flex flex-col">
                                        <span className="text-[#303972] text-[16px] font-[600]">{food.interest}%</span>
                                        <span className="text-[#A098AE] text-[12px]">Interest</span>
                                    </div>
                                </div>

                                {/* Progress Circle */}
                                <div className="relative w-[50px] h-[50px]">
                                    <svg className="w-full h-full" viewBox="0 0 50 50">
                                        {/* Background circle */}
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke="#E5E5E5"
                                            strokeWidth="4"
                                        />
                                        {/* Progress circle */}
                                        <circle
                                            cx="25"
                                            cy="25"
                                            r="20"
                                            fill="none"
                                            stroke="#4D44B5"
                                            strokeWidth="4"
                                            strokeDasharray="125.6"
                                            strokeDashoffset="25"
                                            strokeLinecap="round"
                                            transform="rotate(-90 25 25)"
                                        />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-[#303972] text-[12px] font-[600]">
                                        60%
                                    </span>
                                </div>

                                {/* Menu Icon */}
                                <button className="text-[#A098AE] hover:text-[#4D44B5] transition-colors">
                                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-[20px]" />
                                </button>
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

export default FoodComp;