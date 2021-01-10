import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSession } from "../context/UserContext";
import { db, updateUserDocument } from "../firebase";
import { ProfileImage } from "../components/ProfileImage";

const Profile = () => {
  const { user } = useSession();
  const { id } = useParams();
  const { register, setValue, handleSubmit } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  
  const { mutateAsync, isLoading } = useMutation(updateUserDocument);

  useEffect(() => {
    const docRef = db.collection("users").doc(id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);

        Object.entries(documentData).map((entry) => {
          setValue(entry[0], entry[1]);
        });
      }
    });
    return unsubscribe;
  }, [user?.uid, setValue, id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ uid: id, ...data, email: user.email });
    } catch (error) {
      console.log(error);
    }
  });

  if (!userDocument) return null;

  const formClassname = `ui big form twelve wide column ${
    isLoading ? "loading" : ""
  }`;

  return (
    <div
      className="add-form-container"
      style={{ maxWidth: 960, margin: "50px auto" }}
    >
      <div className="ui grid stackable">
        <ProfileImage id={id} />
        <form className={formClassname} onSubmit={onSubmit}>
          <div className="fields">
            <div className="eight wide field">
              <label>
                Name
                <input type="text" name="name" ref={register} />
              </label>
            </div>
            <div className="eight wide field">
              <label>
                Email
                <input type="text" name="email" disabled ref={register} />
              </label>
            </div>
          </div>
          <div className="fields">
            <div className="six wide field">
              <label>
                Address
                <input type="text" name="address" ref={register} />
              </label>
            </div>
            <div className="five wide field">
              <label>
                City
                <input type="text" name="city" ref={register} />
              </label>
            </div>
            <div className="two wide field">
              <label>
                State
                <input type="text" name="state" ref={register} />
              </label>
            </div>
            <div className="three wide field">
              <label>
                Zip
                <input type="text" name="zip" ref={register} />
              </label>
            </div>
          </div>
          <div className="equal width fields">
            <div className="field">
              <label>
                Phone
                <input type="text" name="phone" ref={register} />
              </label>
            </div>
            <div className="field">
              <label>
                Specialty
                <select className="specialty" name="specialty" ref={register}>
                  <option value="field agent">Field Agent</option>
                  <option value="covert operations">Covert Operations</option>
                  <option value="intelligence officer">
                    Intelligence Officer
                  </option>
                </select>
              </label>
            </div>
            <div className="field">
              <label>
                ip
                <input type="text" name="ip" ref={register} />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="ui submit large grey button right floated"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
