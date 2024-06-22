import { fetchMyStatsData } from "@/services/user";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

export const useDashboard = () => {
  const router = useRouter();
  const [state, setState] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMyStats = async () => {
      try {
        const response = await fetchMyStatsData();
        if (response.success) {
          setState(response.data?.data);
        } else {
          toast.error(response.error);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    };
    fetchMyStats();
  }, [router]);

  const filteredData = useMemo(() => {
    return state
      ? state.products?.filter((data: any) =>
          data?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  }, [state, searchTerm]);

  const sortedData = useMemo(() => {
    if (!state) return [];
    return [...filteredData].sort((a, b): any => {
      if (sortOrder === "Newest") {
        //@ts-ignore
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === "inactive") {
        return a.isActive === false;
      }
      return 0;
    });
  }, [filteredData, sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, sortedData.length);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    state,
    filteredData,
    sortedData,
    currentPage,
    itemsPerPage,
    sortOrder,
    searchTerm,
    currentItems,
    startItem,
    endItem,
    totalPages,
    changePage,
    setSearchTerm,
    setSortOrder,
    setCurrentPage,
  };
};
