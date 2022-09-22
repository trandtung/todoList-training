import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { ApiClient } from "../../request/request";
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { logout } from "../../utils/apiRequest";
import { loginSuccess } from "../../stores/slice/authSlice";
import ChangePassword from "../../component/ChangePassword/ChangePassword";

import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Header() {
  const dispatch=useDispatch()
  useEffect(() => {
    ApiClient.get(`/api/users/${localStorage.getItem("id")}`).then((res) => {
      dispatch(loginSuccess(res.data.data));
    });
  }, []);
  const user = useSelector((state) => state.auth.login?.currenUser);
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrap-search")}>
        <div>
          <h1>ToDoApp</h1>
        </div>
        <Tippy
          interactive
          visible={visible}
          onClickOutside={hide}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx("option-user")} onClick={visible && hide}>
                <ChangePassword />
                <button onClick={logout}>Log out</button>
              </div>
            </div>
          )}
        >
          <div className={cx("user")} onClick={visible ? hide : show}>
            <FontAwesomeIcon icon={faUser} />
            <p>{user?.username}</p>
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Header;