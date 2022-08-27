import Recipe from "./Recipe";

function Menu({ title, recipes }) {
  // JSX로 화면 만들기
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <Recipe key={index} {...recipe} />
        ))}
      </div>
    </article>
  );
}

Menu.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
};
Menu.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
};

export default Menu;

