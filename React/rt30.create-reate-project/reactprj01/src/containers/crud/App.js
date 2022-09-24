import CrudContainer from './crud/CrudContainer';
import styled from 'styled-components';

const StyledApp = styled.div`
  table {
    margin: 0 -1px;
    /* table-layout: fixed; */
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  table,
  th,
  td {
    border: 1px solid #7c7c7c;
  }
  th,
  td {
    padding: 0.2em;
    text-align: left;
    line-height: 1.3em;
  }
  caption {
    visibility: hidden;
    height: 1px;
  }

  xmp {
    line-height: 1.2em;
    margin: 0 0 0 -30px;
  }

  pre {
    line-height: 1.2em;
    box-sizing: border-box;
  }
  div > table {
    margin: 0 45px 0 0;
    width: 95%;
  }
`;

function App() {
  return (
    <StyledApp>
      <CrudContainer></CrudContainer>
    </StyledApp>
  );
}

export default App;
