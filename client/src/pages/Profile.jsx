import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { profileId } = useParams();
  const [savedItems, setSavedItems] = useState([]);

  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId },
    }
  );

  const profile = data?.me || data?.profile || {};

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedItems") || "[]");
    setSavedItems(items);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const deleteItem = (itemId) => {
    setSavedItems((prevItems) =>
      prevItems.filter((item) => item.item.id !== itemId)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (!profile?.name) {
    return (
      <div className="container d-flex justify-content-center align-items-center mt-5 pt-5 pb-5 border border-3 border-danger">
        <div className="text-center text-white">
          <h1>How dare you... </h1>
          <h4>You need to be logged in to see this page!</h4>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="container mt-4 mb-4">
        <h1 className="mb-4">
          {profileId ? `${profile.name}'s` : "Your"} saved ammo!
        </h1>
        <div>
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <div key={item.item.id} className="mb-2">
                <div className="card" style={{ backgroundColor: "#212529" }}>
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: "white" }}>
                      {item.item.shortName}
                    </h5>
                    <p className="card-text" style={{ color: "white" }}>
                      Damage: {item.damage}, Armor Damage: {item.armorDamage},
                      Fragmentation Chance: {item.fragmentationChance},
                      Penetration Power: {item.penetrationPower}, Accuracy
                      Modifier: {item.accuracyModifier}, Recoil Modifier:{" "}
                      {item.recoilModifier}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(item.item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No saved ammo items.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;

/*import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {profileId ? `${profile.name}'s` : 'Your'} friends have endorsed these
        skills...
      </h2>
    </div>
  );
};

export default Profile;
*/
