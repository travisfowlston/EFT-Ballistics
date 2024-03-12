import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { useMutation } from "@apollo/client";
import { ADD_AMMO } from "../utils/mutations";
import Auth from "../utils/auth";

const Home = () => {
  // Creates a state variable to store the ammo data
  const [ammoData, setAmmoData] = useState([]);
  const [selectedAmmoIds, setSelectedAmmoIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        query {
          ammo {
            item {
              id
              shortName
              name
              gridImageLink
            }
            caliber
            tracer
            projectileCount
            damage
            armorDamage
            fragmentationChance
            penetrationPower
            accuracyModifier
            recoilModifier
          }
        }
      `;

      try {
        const data = await request("https://api.tarkov.dev/graphql", query);
        setAmmoData(data.ammo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Creates an empty object
  const groupedAmmo = {};
  // Loops through the ammoData array and groups the ammo by caliber
  ammoData.forEach((ammo) => {
    // If the caliber doesn't exist in the groupedAmmo object, it will create an empty array
    if (!groupedAmmo[ammo.caliber]) {
      groupedAmmo[ammo.caliber] = [];
    }
    // Pushes the ammo into the array
    groupedAmmo[ammo.caliber].push(ammo);
  });

  const [addAmmo] = useMutation(ADD_AMMO);

  function saveToProfile(ammo) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    addAmmo({
      variables: {
        ammo: ammo.item.id,
        profileId: Auth.getProfile().data._id,
      },
    });

    setSelectedAmmoIds((prevIds) => [...prevIds, ammo.item.id]);
    console.log(selectedAmmoIds);
  }

  return (
    <main>
      <div className="container mt-4 mb-4">
        {Object.keys(groupedAmmo).map((caliber) => (
          <div key={caliber}>
            <button
              className="btn btn-dark position-relative w-10 mb-4 mt-4 padding-1"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#caliber-${caliber}`}
              aria-expanded="true"
              aria-controls={`caliber-${caliber}`}
            >
              {caliber}
            </button>
            <div className="collapse show" id={`caliber-${caliber}`}>
              <table className="table table-dark table-striped-columns">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Damage</th>
                    <th>Armor Damage</th>
                    <th>Fragmentation Chance</th>
                    <th>Penetration Power</th>
                    <th>Accuracy Modifier</th>
                    <th>Recoil Modifier</th>
                    <th>Save to profile</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedAmmo[caliber].map((ammo) => (
                    <tr key={ammo.item.id}>
                      <td>
                        {" "}
                        <img
                          src={ammo.item.gridImageLink}
                          alt={ammo.item.shortName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{ammo.item.shortName}</td>
                      <td>{ammo.damage}</td>
                      <td>{ammo.armorDamage}</td>
                      <td>{ammo.fragmentationChance}</td>
                      <td>{ammo.penetrationPower}</td>
                      <td>{ammo.accuracyModifier}</td>
                      <td>{ammo.recoilModifier}</td>
                      <td>
                        <button
                          className="btn btn-dark signUpBtn"
                          onClick={() => saveToProfile(ammo)}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
