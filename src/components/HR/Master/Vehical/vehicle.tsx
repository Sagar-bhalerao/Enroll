import { useState, useEffect } from "react";
import Paginations from "../../../../Helper/Pagination/Pagination";
import { getVehical } from "../../../../Services/HR/Master/MasterAPI";
import ReusableHeader from "../ReusableHeader";
import { toast } from "sonner";


const Vehicle = () => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchCatg = async () => {
            try {
                const response =  await getVehical();                
                    setData(response);
                    setloading(false);                

            } catch (error: any) {
                toast.error(`Something went wrong,   ${error.message}`);
               
                
            }
        }
        fetchCatg();
    }, [])
    const itemperPage = 8;

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastItem = currentPage * itemperPage;
    const indexOfFirstItem = indexOfLastItem - itemperPage;
    const currentItems = data.filter((item: any) =>
        (item.veh_name && item.veh_name.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(indexOfFirstItem, indexOfLastItem);
    let loadingfall = <h1 className="flex justify-center"><span className=" loading loading-spinner text-info"></span></h1>

    const handleVehCreate = ()=>{
        console.log("vehical comp");
        }
    return (
        <>
            <div className="flex justify-center items-center ">
                <div className="overflow-x-auto  w-full items-center  shadow-xl rounded-xl p-2 m-6 ">
                    <ReusableHeader setSearchTerm={setSearchTerm} name="List of all Vehicle" createButtonAction={handleVehCreate} />
                    {loading ? loadingfall : (<table className="table table-zebra">
                        {/* head */}
                        <thead className=" font-bold  bg-base-200 text-sm">
                            <tr >

                                <th>Veh Code</th>
                                <th>Veh Name</th>
                                <th>Veh No</th>
                                <th>Type</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        {currentItems.map((item: any, index: number) => (
                            <tbody key={index}>

                                <tr className="hover">
                                    <td>{item.veh_no}</td>
                                    <td>{item.veh_name}</td>
                                    <td>{item.veh_no}</td>
                                    <td>{item.veh_type}</td>
                                    <td>{item.veh_catg_no}</td>

                                </tr>

                            </tbody>
                        ))}
                    </table>)}

                </div>
            </div>
            {!loading && <Paginations currentPage={currentPage} itemperPage={itemperPage} handlePageChange={handlePageChange} data={data} />}
        </>
    )
}

export default Vehicle;


