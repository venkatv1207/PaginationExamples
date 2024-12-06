import { useEffect, useState } from "react";
import Data from "./Data";
import Pagination from "./Pagination";

function Fetching() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsperPage, setPostperPage] = useState(8);

  useEffect(() => {
    const fetching = async () => {
      try {
        setLoad(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const d = await res.json(); // Await the JSON parsing
        setData(d);
      } catch (err) {
        console.log(err);
      } finally {
        setLoad(false);
      }
    };
    fetching();
  }, []);
  const lastpost = currentPage * postsperPage;
  const firstpost = lastpost - postsperPage;
  const currentPosts = data.slice(firstpost, lastpost);

  return (
    <div>
      {load && <h1>Loading...</h1>}
      <div>
        <Data data={currentPosts} />
        <Pagination
          totalPosts={data.length}
          postsperPage={postsperPage}
          setCurrentPage={setCurrentPage}
          setPostperPag={setPostperPage}
        />
      </div>
    </div>
  );
}

export default Fetching;
