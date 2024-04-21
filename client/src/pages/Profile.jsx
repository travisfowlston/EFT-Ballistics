import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";
import { REMOVE_AMMO } from "../utils/mutations";
import Auth from "../utils/auth";

const Profile = () => {
  // Retrieves the profileId from the URL
  const { profileId } = useParams();
  // Creates a state variable to store the saved ammo
  const [savedAmmos, setSavedAmmos] = useState([]);

  // Queries the database for the profile data
  const { loading, data, error } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    { variables: { profileId } }
  );

  // If the data exists, it sets the savedAmmos state to the profile's ammo
  useEffect(() => {
    if (data) {
      const profileData = profileId ? data.profile : data.me;
      setSavedAmmos(profileData.ammos || []);
    }
  }, [data, profileId]);

  // Creates a mutation to remove ammo from the profile
  const [removeAmmo] = useMutation(REMOVE_AMMO);

  // This function handles removing ammo from the profile
  const handleRemoveAmmo = (ammo) => {
    // Retrieves the token from the Auth service
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // Executes the removeAmmo mutation with the ammo and profileId as variables
    removeAmmo({
      variables: {
        // If the ammo is an object, it uses the shortName property, otherwise it uses the ammo itself
        ammo: ammo.item?.shortName || ammo,
        profileId: Auth.getProfile().data._id,
      },
      // Updates the cache with the new profile data
    }).then(() => {
      setSavedAmmos((prevAmmos) =>
        prevAmmos.filter((savedAmmo) => savedAmmo !== ammo)
      );
    });
  };

  if (loading)
    return (
      <div className="container mt-5 mb-5 pt-5 pb-5 border border-3 border-white">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5 mb-5 pt-5 pb-5 border border-3 border-danger">
        <div className="text-center text-white">
          <h1>How dare you...</h1>
          <h4>You need to be logged in to see this page!</h4>
        </div>
      </div>
    );

  return (
    <main>
      <div className="container mt-4 mb-4">
        <h1 className="mb-4">My saved ammo!</h1>
        {savedAmmos.length > 0 ? (
          savedAmmos.map((ammo, index) => (
            <div key={index} className="mb-2">
              <div className="card" style={{ backgroundColor: "#212529" }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "white" }}>
                    Ammo: {ammo}
                  </h5>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-danger"
                    style={{ margin: "10px" }}
                    onClick={() => handleRemoveAmmo(ammo)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No saved ammo items.</p>
        )}
      </div>
    </main>
  );
};

export default Profile;
