import { useState, useEffect } from "react";

function FetchingData() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const d = await res.json();
        setData(d); // Set data from the API response
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetching();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Pagination logic: show a range of pages
  const maxPagesToShow = 20;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevNext = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "prev" && prevPage > 1) return prevPage - 1;
      if (direction === "next" && prevPage < totalPages) return prevPage + 1;
      return prevPage;
    });
  };

  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginations">
        <button
          onClick={() => handlePrevNext("prev")}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNum = startPage + index;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={currentPage === pageNum ? "active" : ""}
            >
              {pageNum}
            </button>
          );
        })}

        {totalPages > maxPagesToShow &&
          currentPage < totalPages - Math.floor(maxPagesToShow / 2) && (
            <span>...</span>
          )}

        <button
          onClick={() => handlePrevNext("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FetchingData;
