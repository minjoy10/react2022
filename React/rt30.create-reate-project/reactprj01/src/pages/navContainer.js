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
import styled, { css } from 'styled-components';
import { IconContext } from 'react-icons';
import { SidebarData } from '../constants/SidebarData';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

const StyledSideBar = styled.div`
  /* styled 설정. https://styled-components.com/docs/basics#adapting-based-on-props */

  .navbar {
    background-color: #060b26;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
    cursor: pointer;
    border-bottom: 0;
  }

  .nav-menu {
    background-color: #060b26;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
    z-index: 99;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #1a83ff;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #060b26;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }
`;

function PageHome({ ...props }) {
  const [isShowNav, setisShowNav] = useState(false); // 상태값이 기본타입인 경우

  const handlerShowNav = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    //e.stopPropagation();
    //e.preventDefault();
    setisShowNav(!isShowNav);
  };

  const handlerNavLink = (e) => {
    // 이벤트 핸들러는 화살표 함수로 만든다
    console.log(e.target);
    //e.stopPropagation(); //이벤트 버블링 방지. 이벤트 취소
    //setisShowNav(false);
  };

  // JSX로 화면 만들기. 조건부 렌더링: https://ko.reactjs.org/docs/conditional-rendering.html
  return (
    <StyledSideBar>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <NavLink to="#" className="menu-bars">
            <FaIcons.FaBars onClick={handlerShowNav} />
          </NavLink>
        </div>
        {isShowNav && (
          <nav className="nav-menu active">
            <ul className="nav-menu-items" onClick={handlerShowNav}>
              <li className="navbar-toggle">
                <NavLink to="#" className="menu-bars" onClick={handlerNavLink}>
                  <AiIcons.AiOutlineClose />
                </NavLink>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </IconContext.Provider>
    </StyledSideBar>
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
