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
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from '../components/Home';
import RecipesContainer from '../containers/recipes/App';
import StarRatingContainer from '../containers/starrating/RatingContainer';
import CrudContainer from '../containers/crud/CrudContainer';
import TodoContainer from '../containers/todo/TodoContainer';
import styled, { css } from 'styled-components';
import NavContainer from './navContainer';
import CounterContainer from '../containers/counter/CounterContainer';

const StyledPageHome = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .home,
  .reports,
  .products {
    display: flex;
    height: 90vh;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }
  .home h1 {
    font-size: 100px;
    font-weight: bold;
  }
`;

function PageHome({ ...props }) {
  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledPageHome>
      <NavContainer></NavContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipesContainer />} />
        <Route path="/starrating" element={<StarRatingContainer />} />
        <Route path="/crud" element={<CrudContainer />} />
        <Route path="/todo" element={<TodoContainer />} />
        <Route path="/counter" element={<CounterContainer />}></Route>
      </Routes>
    </StyledPageHome>
  );
}

PageHome.propTypes = {
  // props의 프로퍼티 타입 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: PropTypes.func.isRequired,
  // 인자명: PropTypes.arrayOf(PropTypes.object),
};
PageHome.defaultProps = {
  // props의 디폴트 값 설정. https://ko.reactjs.org/docs/typechecking-with-proptypes.html
  // 인자명: () => {},
  // 인자명: [],
};

export default React.memo(PageHome); // React.memo()는 props 미변경시 컴포넌트 리렌더링 방지 설정
