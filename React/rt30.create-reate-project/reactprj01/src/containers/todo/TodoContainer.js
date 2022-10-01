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
import TodoHeader from './components/TodoHeader';
import TodoFooter from './components/TodoFooter';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

const StyledTodoContainer = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */

  button {
    border-style: groove;
  }
`;

// import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useLocation, useHistory, useNavigate } from 'react-router-dom';

// import { action함수 as actions, action상수 as types } from './action';

/* const {aaa, bbb, ...props} = props */
function TodoContainer({ ...props }) {
  const [todoItems, setTodoItems] = useState([
    { id: 1, todo: '영화보기', done: false },
    { id: 2, todo: '주말 산책', done: true },
    { id: 3, todo: 'ES6 학습', done: false },
    { id: 4, todo: '잠실 야구장', done: false },
  ]);

  // useReducer 를 사용한 컴포넌트의 상태값 설정. 리듀서는 현재 상태를 받아서 새 상태를 반환하는 함수다
  const [리듀서, set리듀서] = useReducer((oldvalue, newvalue) => ({ ...oldvalue, ...newvalue }), { id: 0, name: '', age: 0 }); // 리듀서(reducer) 방식의 상태값 설정

  // ref 만들기.
  // const refInput = useRef();

  // refIsMounted는 생명주기의 마운트와 업데이트를 구분하기 위한 ref
  const refIsMounted = useRef(false);
  useEffect(
    () => {
      if (refIsMounted.current) {
        // 업데이트 될 때마다 실행됨. 여러번. state 가 변경될 때마다
        // console.log('TodoContainer >> componentDidUpdate');
      } else {
        // 마운트 완료 후에 실행됨. 한번만. focus 줄때
        // console.log('TodoContainer >> componentDidMount');
        refIsMounted.current = true;
      }
      return () => {
        // 언마운트 직전에 한번만 실행됨.
        // console.log('TodoContainer >> componentWillUmount');
      };
    },
    [
      /* 조건 제어: 메서드와 연관되는 상태(변수)명들을 기술 */
    ],
  );

  // callback 메서드 작성. callback 메서드는 부모의 공유 상태값을 변경하기 위해서 사용된다.
  // useCallback 상태값이 변경되면 메서드를 다시 만들고 자식들에게 변경된 함수(메서드)를 다시 내려준다.

  const callbackClearAll = useCallback(() => {
    // state 변경
    debugger;

    //직접 코드를 완성하시오,
    //setTodoItems 는 todoItems 상태를 바꾸기위한 setter 메서드
    //todoItems = [];
    setTodoItems([]);
  }, [
    /*연관배열: 메서드와 연관되는 상태(변수)명들을 기술*/
    todoItems,
  ]);
  const callbackDoneToggle = useCallback(
    (id) => {
      // state 변경
      const newTodos =
        todoItems &&
        todoItems.map((item) => {
          if (item.id === id) {
            item.done = !item.done;
          }
          return item;
        });

      setTodoItems(newTodos);
    },
    [todoItems],
  );

  const callbackRemoveTodo = useCallback(
    (id) => {
      // state 변경
      debugger;
      const newTodos = todoItems.filter((item) => {
        if (item.id === id) {
          return false;
        }
        return true;
      });

      setTodoItems(newTodos);
    },
    [todoItems],
  );

  const callbackAddTodo = useCallback(
    (newId) => {
      // items에서 최대 id 값을 구하는 방법.
      // 방법1. todoItems.map()과 todoItems.reduce()를 사용하여 max id를 찾는 방법
      // items.push(param);
      // ...생략
      debugger;
      const maxid = todoItems
        .map((item) => item.id) // [1,2,3,4]
        .reduce((pvalue, cvalue) => {
          if (pvalue > cvalue) return pvalue;
          else return cvalue;
        }, 0); // 4
      const obj = {
        id: maxid + 1,
        todo: newId.todo,
      };

      //items.push(obj) === [...items,obj]
      setTodoItems([...todoItems, obj]);
    },
    [todoItems],
  );

  // 이벤트 핸들러 작성.
  const handler = () => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(window.event.target);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledTodoContainer>
      <TodoHeader></TodoHeader>
      <TodoInput callbackAddTodo={callbackAddTodo}></TodoInput>
      <TodoList todoItems={todoItems} callbackDoneToggle={callbackDoneToggle} callbackRemoveTodo={callbackRemoveTodo}></TodoList>
      <TodoFooter callbackClearAll={callbackClearAll}></TodoFooter>
    </StyledTodoContainer>
  );
}

TodoContainer.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.string,
  // 인자명: PropTypes.oneOf(['News', 'Photos']),
};
TodoContainer.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: '',
  // 인자명: 'News',
};

export default React.memo(TodoContainer); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
