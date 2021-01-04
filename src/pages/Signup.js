import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { signup } from "../firebase.js";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const { mutateAsync, isLoading } = useMutation(signup);

  const onSubmit = handleSubmit(async (data) => {
    let newUser;
    try {
      newUser = await mutateAsync({ ...data });
      reset();
    } catch (err) {
      console.log(err);
    }

    if (newUser) navigate(`/profile/${newUser.uid}`, { replace: true });
  });

  const formClassName = `ui form ${isLoading ? "loading" : ""}`;

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="two fields">
              <div className="field">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    ref={register}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    ref={register}
                  />
                </label>
              </div>
            </div>
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
                Signup
              </button>
              or
              <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
