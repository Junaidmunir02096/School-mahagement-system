
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar,faArrowLeft, faChartBar, faArrowTrendUp, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ProgressCircle from "../PercentageCircle";

const FoodDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const food = location.state?.food;

    const foodData = food || {
        id: id,
        name: 'Beef Steak with Fried Potato',
        category: 'Lunch',
        rating: 4.9,
        orders: 1456,
        interest: 26,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    };

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
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-[#4D44B5] text-[20px] cursor-pointer mr-[10px]" onClick={() => navigate(-1)} />
                <h1 className="text-[36px] font-[700] text-center p-[20px] text-[#4D44B5]">Food Details</h1>

                </div>
                <div className="flex items-center bg-[#fff] rounded-full px-4 py-[10px] w-[300px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#A098AE] ml-[20px]" />
                    <input type="text" placeholder="Search here..." className="outline-none ml-[10px] border-none ml-2 w-full text-[#A098AE] placeholder-[#A098AE]" />
                </div>
            </div>

            {/* Main Content Container */}
            <div className="bg-white rounded-[20px] p-[30px] mt-[20px]">
                {/* Top Section - Image and Details */}
                <div className="flex gap-[30px] mb-[40px]">
                    {/* Left - Large Image */}
                    <div className="w-[280px] h-[200px] bg-[#C1BBEB] rounded-[20px] flex-shrink-0">
                        {foodData.image ? (
                            <img src={foodData.image} alt={foodData.name} className="w-full h-full object-cover rounded-[20px]" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#A098AE]">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Right - Title, Badge, Description */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-[15px]">
                            <h2 className="text-[#303972] text-[28px] font-[700]">{foodData.name}</h2>
                            <button className="text-[#A098AE] bg-transparent border-none hover:text-[#4D44B5] transition-colors">
                                <FontAwesomeIcon icon={faEllipsis} className="text-[24px]" />
                            </button>
                        </div>
                        
                        <span className={`${getCategoryColor(foodData.category)} px-[20px] py-[8px] rounded-full text-[14px] font-[600] w-fit mb-[20px]`}>
                            {foodData.category}
                        </span>

                        <p className="text-[#A098AE] text-[15px] leading-[1.8]">
                            {foodData.description}
                        </p>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="flex items-center gap-[60px] mb-[40px] pb-[40px] border-b-2 border-[#F3F4FF]">
                    {/* Rating */}
                    <div className="flex flex-col gap-[10px]">
                        <span className="text-[#A098AE] text-[14px]">Rating</span>
                        <div className="flex items-center gap-[8px]">
                            <FontAwesomeIcon icon={faStar} className="text-[#FCC43E] text-[24px]" />
                            <span className="text-[#303972] text-[28px] font-[700]">{foodData.rating}</span>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="flex items-center gap-[15px]">
                        <FontAwesomeIcon icon={faChartBar} className="text-[#4D44B5] text-[40px]" />
                        <div className="flex flex-col">
                            <span className="text-[#303972] text-[28px] font-[700]">{foodData.orders?.toLocaleString() || '1,456'}</span>
                            <span className="text-[#A098AE] text-[14px]">Total Order</span>
                        </div>
                    </div>

                    {/* Interest */}
                    <div className="flex items-center gap-[15px]">
                        <FontAwesomeIcon icon={faArrowTrendUp} className="text-[#4D44B5] text-[40px]" />
                        <div className="flex flex-col">
                            <span className="text-[#303972] text-[28px] font-[700]">{foodData.interest}%</span>
                            <span className="text-[#A098AE] text-[14px]">Interest</span>
                        </div>
                    </div>

                    {/* Progress Circle */}
                    <div className="flex items-center gap-[15px]">
                        <ProgressCircle percentage={60} />
                    </div>
                </div>

                {/* Ingredients and Nutrition Section */}
                <div className="flex gap-[60px]">
                    {/* Ingredients */}
                    <div className="flex-1">
                        <h3 className="text-[#303972] text-[22px] font-[700] mb-[20px]">Ingredients</h3>
                        <ul className="text-[#A098AE] text-[14px] leading-[2] list-disc pl-[20px]">
                            {foodData.ingredients && foodData.ingredients.length > 0 ? (
                                foodData.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))
                            ) : (
                                <>
                                    <li>Ingrident Not Found</li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Nutrition */}
                    <div className="flex-1">
                        <h3 className="text-[#303972] text-[22px] font-[700] mb-[20px]">Nutrition:</h3>
                        <ul className="text-[#A098AE] text-[14px] leading-[2] list-disc pl-[20px]">
                            {foodData.nutrition && foodData.nutrition.length > 0 ? (
                                foodData.nutrition.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            ) : (
                                <>
                                    <li>Nutrition Not Available</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails;