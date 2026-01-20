import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ 
    currentPage, 
    totalPages, 
    totalItems, 
    itemsPerPage, 
    onPageChange,
    maxVisiblePages = 3
}) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Calculate which page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust start page if we're near the end
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-between items-center mt-[30px] pb-[10px]">
            <p className="text-[#A098AE] text-[14px]">
                Showing {startIndex + 1}-{endIndex} from {totalItems} data
            </p>
            <div className="flex items-center gap-[10px]">
                <button
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center ${
                        currentPage === 1 
                            ? 'text-[#E5E5E5] cursor-not-allowed' 
                            : 'text-[#A098AE] hover:bg-[#F3F4FF] cursor-pointer'
                    }`}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-[12px]" />
                </button>

                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-[14px] font-[600] transition-colors ${
                            currentPage === pageNumber
                                ? 'bg-[#4D44B5] text-white'
                                : 'text-[#A098AE] hover:bg-[#F3F4FF]'
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-[32px] h-[32px] rounded-[8px] flex items-center justify-center ${
                        currentPage === totalPages 
                            ? 'text-[#E5E5E5] cursor-not-allowed' 
                            : 'text-[#A098AE] hover:bg-[#F3F4FF] cursor-pointer'
                    }`}
                >
                    <FontAwesomeIcon icon={faChevronRight} className="text-[12px]" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
