function Recipe({ name, ingredients, steps }) {
  // JSX로 화면 만들기
  return (
    <section id={name}>
      <h1>{name}</h1>
      <ul className="ingredients">
        {ingredients.map((ingredients, i) => (
          <li key={i}>{ingredients.name}</li>
        ))}
      </ul>
      <section className="instructions">
        <h2>조리 절차</h2>
        {steps.map((step, i) => (
          <p key={i}>{step}</p>
        ))}
      </section>
    </section>
  );
}

Recipe.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
};
Recipe.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
};

export default Recipe;
