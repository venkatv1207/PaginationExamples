/* eslint-disable react/prop-types */

function Pagination({ totalPosts, postsperPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalPosts / postsperPage);
  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        &lt; {/* Left arrow */}
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        &gt; {/* Right arrow */}
      </button>
    </div>
  );
}

export default Pagination;
