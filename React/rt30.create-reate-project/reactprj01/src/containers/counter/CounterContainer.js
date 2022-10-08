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
// import { BrowserRouter, Routes, Route, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { action함수 as actions, action상수 as types } from './action';

const StyledCounterContainer = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  .content {
    text-align: center;
  }
`;

function CounterContainer({ ...props }) {
  // redux store 와 연동되는 경우에만 useDispatch(), useSelector() 사용
  const dispatch = useDispatch();
  const { error, isLoading, counter, welcome } = useSelector(
    (state) => state.counter,
  );

  // useState 를 사용한 컴포넌트의 상태값 설정
  const [header, setHeader] = useState('redux 사용 앱'); // 상태값이 기본타입인 경우
  //const [welcome, setWelcome] = useState('HELLO WORLD'); // 상태값이 기본타입인 경우
  //const [counter, setCounter] = useState(4); // 상태값이 기본타입인 경우
  const [callapi, setCallapi] = useState(true); // 상태값이 기본타입인 경우

  // useReducer 를 사용한 컴포넌트의 상태값 설정. 리듀서는 현재 상태를 받아서 새 상태를 반환하는 함수다
  const [리듀서, set리듀서] = useReducer(
    (oldvalue, newvalue) => ({ ...oldvalue, ...newvalue }),
    { id: 0, name: '', age: 0 },
  ); // 리듀서(reducer) 방식의 상태값 설정

  // ref 만들기.
  // const refInput = useRef();
  const refInputApi = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('CounterContainer >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('CounterContainer >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('CounterContainer >> componentWillUmount');
      };
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  const callback = useCallback(
    (param) => {
      // state 변경
    },
    [
      /* 연관배열: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // 이벤트 핸들러 작성.
  const handlerChangeCallapi = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    //debugger;
    setCallapi(!callapi);
  };
  const handlerIncrement = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    //debugger;
    //setCounter(counter + 1);
    const action = actions.setTaskReducer({ counter: counter + 1 });
    dispatch(action);
  };
  const handlerDecrement = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
    //setCounter(counter - 1);
    const action = actions.setTaskReducer({ counter: counter - 1 });
    dispatch(action);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledCounterContainer>
      <div className="content">
        <h1>{header}</h1>
        <h2>{welcome}</h2>
        <h3>{counter}</h3>
        <div>
          <input
            type="checkbox"
            defaultChecked={callapi}
            ref={refInputApi}
            onChange={handlerChangeCallapi}
          />
          외부 api 호출
        </div>
        <button onClick={handlerIncrement}>더해줘</button>
        <button onClick={handlerDecrement}>빼줘</button>
      </div>
    </StyledCounterContainer>
  );
}

CounterContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
CounterContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(CounterContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
