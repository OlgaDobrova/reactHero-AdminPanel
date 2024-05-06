const HeroesListItem = ({ id, name, description, element, onDelete }) => {
  const onHeroDelete = () => {
    onDelete(id);
  };
  let elementClassName;

  switch (element) {
    case "fire":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "water":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "wind":
      elementClassName = "bg-success bg-gradient";
      break;
    case "earth":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src="https://spektr-tv67.ru/wp-content/uploads/2021/03/avatar_noname_2.png"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
          onClick={onHeroDelete}
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
