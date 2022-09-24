import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
// import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

// import { action함수 as actions, action상수 as types } from './action';

/* const {aaa, bbb, ...props} = props */
function CrudListItem({
  item,
  callbackDel,
  callbackUp,
  callbackDown,
  callbackSave
}) {
  const [isEditMode, setIsEditMode] = useState(false); // 상태값이 기본타입인 경우

  const refInputName = useRef(false);
  const refInputPower = useRef(false);

  // 이벤트 핸들러 작성.
  const handlerDel = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    debugger;
    callbackDel(/*삭제될 정보를 넘긴다*/ item);
  };
  const handlerUp = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    debugger;
    callbackUp(/*변경될 정보를 넘긴다*/ item);
  };
  const handlerDown = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    callbackDown(/*변경될 정보를 넘긴다*/ item);
  };
  const handlerEdit = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    //isEditMode 값 변경하기
    setIsEditMode(!isEditMode);
  };
  const handlerSave = (event) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);

    if (!refInputName.current.value || !refInputName.current.value.trim()) {
      alert("name 입력하시오");
      refInputName.current.focus();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
    if (!refInputPower.current.value || !refInputPower.current.value.trim()) {
      alert("power 입력하시오");
      event.stopPropagation();
      event.preventDefault();
      refInputPower.current.focus();
      return false;
    }

    //변경할 객체 정보를 만든다.
    const newitem = {
      id: item.id,
      name: refInputName.current.value,
      power: Number(refInputPower.current.value)
    };
    //부모 콜백 메서드 호출 CrudContainer.callbackSave();
    callbackSave(/*변경될 정보를 넘긴다*/ newitem);
    //isEditMode 값 변경하기
    setIsEditMode(!isEditMode);
  };

  let strong = "";
  if (item.power >= 300) strong = "strong";
  const formView = (
    <tr className={strong}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.power}</td>
      <td>
        <button type="button" onClick={handlerDel}>
          Del
        </button>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerEdit}>
          Edit
        </button>
      </td>
    </tr>
  );
  const formEdit = (
    <tr className={strong}>
      <td>{item.id}</td>
      <td>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          defaultValue={item.name}
          ref={refInputName}
        />
      </td>
      <td>
        <input
          type="number"
          name="power"
          placeholder="숫자를 입력하세요"
          defaultValue={item.power}
          ref={refInputPower}
        />
      </td>
      <td>
        <button type="button" onClick={handlerDel}>
          Del
        </button>
        <button type="button" onClick={handlerUp}>
          Power Up
        </button>
        <button type="button" onClick={handlerDown}>
          Power Down
        </button>
        <button type="button" onClick={handlerSave}>
          save
        </button>
      </td>
    </tr>
  );

  if (isEditMode === true) return formEdit;
  else return formView;
}

CrudListItem.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  item: PropTypes.object.isRequired,
  callbackDel: PropTypes.func.isRequired,
  callbackUp: PropTypes.func.isRequired,
  callbackDown: PropTypes.func.isRequired,
  callbackSave: PropTypes.func.isRequired
};
CrudListItem.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  item: {},
  callbackDel: () => {},
  callbackUp: () => {},
  callbackDown: () => {},
  callbackSave: () => {}
};

export default React.memo(CrudListItem); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
