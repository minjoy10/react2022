import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

// import { action함수 as actions, action상수 as types } from './action';

/* const {aaa, bbb, ...props} = props */
function CrudInput({ callbackAdd }) {
  // useState 를 사용한 컴포넌트의 상태값 설정
  const [변수명, set변수명] = useState('기본값'); // 상태값이 기본타입인 경우
  const [state, setState] = useState({ id: 0, name: '', age: 0 }); // 상태값이 참조타입 경우

  // useReducer 를 사용한 컴포넌트의 상태값 설정. 리듀서는 현재 상태를 받아서 새 상태를 반환하는 함수다
  const [리듀서, set리듀서] = useReducer((oldvalue, newvalue) => ({ ...oldvalue, ...newvalue }), { id: 0, name: '', age: 0 }); // 리듀서(reducer) 방식의 상태값 설정

  // ref 만들기.
  // const refInput = useRef();
  const refInputName = useRef(false);
  const refInputPower = useRef(false);

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CrudInput >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CrudInput >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CrudInput >> componentWillUmount');
      };
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callback = useCallback(
    (param) => {
      // state 변경
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // 이벤트 핸들러 작성.
  const handlerAdd = (event) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    debugger;

    //Name유효성검사
    //포커스주기
    if (!refInputName.current.value || !refInputName.current.value.trim()) {
      alert('name 입력하시오');
      refInputName.current.focus();
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
    if (!refInputPower.current.value || !refInputPower.current.value.trim()) {
      alert('power 입력하시오');
      event.stopPropagation();
      event.preventDefault();
      refInputPower.current.focus();
      return false;
    }

    //power값을 숫자로 바꾸시오.(문자열을 숫자로)
    const power = Number(refInputPower.current.value);
    const newItem = {
      name: refInputName.current.value,
      power: power,
    };
    callbackAdd(newItem);

    refInputName.current.value = null;
    refInputPower.current.value = null;
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <div>
      <h2>CrudInput Components</h2>
      <div>
        <label htmlFor="">Name : </label>
        <input type="text" name="name" placeholder="이름을 입력하세요" defaultValue={''} ref={refInputName} />
      </div>
      <div>
        <label htmlFor="">Power : </label>
        <input type="number" name="power" placeholder="숫자를 입력하세요" defaultValue={''} ref={refInputPower} />
      </div>
      <button type="button" onClick={handlerAdd}>
        Add
      </button>
    </div>
  );
}

CrudInput.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
  callbackAdd: PropTypes.func.isRequired,
};
CrudInput.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
  callbackAdd: () => {},
};

export default React.memo(CrudInput); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
