/* eslint-disable react/prop-types */
function Cards({ image, title, price }) {
  return (
    <div className="card">
      <div className="card_image">
        <img src={image} alt={title} width={"200px"} />
      </div>
      <div className="card_info">
        <h2>{title}</h2>
        <h4>Rs.{price}/-</h4>
      </div>
    </div>
  );
}

export default Cards;
