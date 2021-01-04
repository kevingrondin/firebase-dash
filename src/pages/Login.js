import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync, isLoading } = useMutation(login);

  const routeOnLogin = async (user) => {
    const token = await user.getIdTokenResult();
    if (token.claims.admin) {
      navigate("/users");
    } else {
      navigate(`/profile/${user.uid}`);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    let user;
    try {
      user = await mutateAsync({ ...data });
      reset();
    } catch (err) {
      console.log(err);
    }

    if (user) routeOnLogin(user);
  });

  const formClassName = `ui form ${isLoading ? "loading" : ""}`;

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={onSubmit}>
            <div className="field">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={register}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register}
                />
              </label>
            </div>
            <div className="field actions">
              <button className="ui primary button login" type="submit">
                Login
              </button>
              or
              <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
