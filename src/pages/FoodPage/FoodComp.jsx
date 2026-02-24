import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar, faChartBar, faArrowTrendUp, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Pagination from "../../component/commonComponent/Pagination.jsx";
import ProgressCircle from "../../component/Food/PercentageCircle.jsx";
import { foodData } from "../../utils/mockData/mockFoodData.js";
import '../../component/Food/FoodComp.css';

const FoodComp = () => {
    const [activeFilter, setActiveFilter] = useState('All Menus');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const percentage = 60;
    const navigate = useNavigate();

    const handleImageClick = (food) => {
        navigate(`/food-details/${food.id}`, { state: { food } });
    };

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
                    <div className="filter-tabs">
                        {['All Menus', 'Breakfast', 'Lunch', 'Snack'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => {
                                    setActiveFilter(filter);
                                    setCurrentPage(1);
                                }}
                                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
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
                                <div
                                    onClick={() => handleImageClick(food)}
                                    className="w-[90px] h-[90px] bg-[#C1BBEB] rounded-[12px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                >
                                    {food.image ? (
                                        <img src={food.image} alt={food.name} className="w-full h-full object-cover rounded-[12px]" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#A098AE]">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-[10px]">
                                    <span className={`${getCategoryColor(food.category)} px-[16px] py-[6px] rounded-full text-[12px] font-[600] w-fit`}>
                                        {food.category}
                                    </span>
                                    <h3 className="text-[#303972] text-[18px] font-[600]">{food.name}</h3>
                                </div>
                            </div>

                            <div className="flex items-center gap-[40px]">
                                <div className="flex items-center gap-[8px]">
                                    <FontAwesomeIcon icon={faStar} className="text-[#FCC43E] text-[16px]" />
                                    <span className="text-[#303972] text-[16px] font-[600]">{food.rating}</span>
                                </div>

                                <div className="flex items-center gap-[10px]">
                                    <FontAwesomeIcon icon={faChartBar} className="text-[#4D44B5] text-[20px]" />
                                    <div className="flex flex-col">
                                        <span className="text-[#303972] text-[16px] font-[600]">{food.orders.toLocaleString()}</span>
                                        <span className="text-[#A098AE] text-[12px]">Total Order</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-[10px]">
                                    <FontAwesomeIcon icon={faArrowTrendUp} className="text-[#4D44B5] text-[20px]" />
                                    <div className="flex flex-col">
                                        <span className="text-[#303972] text-[16px] font-[600]">{food.interest}%</span>
                                        <span className="text-[#A098AE] text-[12px]">Interest</span>
                                    </div>
                                </div>

                                {/* Progress Circle */}
                                <ProgressCircle percentage={food.interest} />

                                {/* Menu Icon */}
                                <button className="text-[#A098AE] bg-transparent border-none hover:text-[#4D44B5] transition-colors">
                                    <FontAwesomeIcon icon={faEllipsis} className="text-[20px]" />
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