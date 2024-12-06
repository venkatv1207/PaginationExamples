import Cards from "./Cards";

/* eslint-disable react/prop-types */
function Data({ data }) {
  return (
    <div className="data">
      {data.map((prod, index) => (
        <Cards
          key={index}
          image={prod.image}
          title={prod.title}
          price={prod.price}
        />
      ))}
    </div>
  );
}

export default Data;
