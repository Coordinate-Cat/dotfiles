import { css } from "uebersicht"

const fav = css`
  font-family: Inter;
  font-weight: bold;
  font-size: 12px;
  display: flex;
`

const github = css`
  border-radius: 0 0 2px 2px;
  height: 18px;
  padding: 1px 8px;
  margin-left: -14px;
  position: relative;
  top: 250px;
  left: -17px;
  background-color: #32302f;
  transform: rotate(270deg);
  border: 1px solid #32302f;
  cursor: pointer;
  > a > svg {
    margin-top: -1px;
    fill: #ecdbb2;
    transform: rotate(90deg);
  }
  :hover {
    > a {
      color: #32302f;
    }
    > a > svg {
      fill: #32302f;
    }
    border: 1px solid #ecdbb2;
    background-color: #ecdbb2;
  }
`

const twitter = css`
  border-radius: 0 0 2px 2px;
  height: 18px;
  padding: 1px 6px;
  margin-left: -14px;
  position: relative;
  top: 304px;
  left: -53px;
  background-color: #32302f;
  transform: rotate(270deg);
  border: 1px solid #32302f;
  cursor: pointer;
  > a > svg {
    margin-top: 5px;
    fill: #ecdbb2;
    transform: rotate(90deg);
  }
  :hover {
    > a {
      color: #32302f;
    }
    > a > svg {
      fill: #32302f;
    }
    border: 1px solid #ecdbb2;
    background-color: #ecdbb2;
  }
`

const flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #ecdbb2;
`
const text = css`
  margin: 0;
  padding-left: 4px;
  line-height: 24px;
`

export const render = ({output, error}) => {
  return error ? (
    <div>Something went wrong: <strong>{String(error)}</strong></div>
  ) : (
    <div className={fav}>
      <div className={github}>
        <a className={flex} href="https://github.com/">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <p className={text}>Github</p>
        </a>
      </div>
      <div className={twitter}>
        <a className={flex} href="https://twitter.com/">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/></svg>
          {/* <p className={text}>Twitter</p> */}
        </a>
      </div>
      <p>{output}</p>
    </div>
  );
}
