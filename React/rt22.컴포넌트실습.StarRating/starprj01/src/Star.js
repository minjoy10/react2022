import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import PropTypes from "prop-types";

function Star({ selected, callbackOnClick }) {
  const onClick  = (e) => {
    console.log(e.target);
    callbackOnClick();
  };
  const aaa = selected ? "star selected" : "star";
  // JSX로 화면 만들기
  return <div className={(selected) ? "star selected" : "star"}
  onClick={onClick}>
</div>;

}

Star.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  selected:PropTypes.bool,
  callbackOnClick:PropTypes.func.isRequired,
};
Star.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  selected:false,
  callbackOnClick:() => {}
};

export default React.memo(Star); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
