import SearchHeader from "../commonComponent/searchNavbar/searchHeader";
const StudentComp = () => {
    return (
        <div className="w-full h-[100vh] overflow-y-scroll bg-[#F3F4FF] p-[20px]">
            <h1 className="text-[36px] font-[700] p-[20px] text-[#4D44B5]">Student</h1>
            <SearchHeader/>
        </div>
    )
}

export default StudentComp;
