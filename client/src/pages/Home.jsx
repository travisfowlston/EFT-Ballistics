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
    const saveButton = document.getElementById(`save-${ammo.item.id}`);

    if (saveButton.checked) {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      addAmmo({
        variables: { ammoId: ammo.item.id },
      });

      setSelectedAmmoIds((prevIds) => [...prevIds, ammo.item.id]);
    }
  }

  function handleSubmit() {
    // Handle the submission of selected ammo IDs
    console.log("Selected Ammo IDs:", selectedAmmoIds);
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
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`save-${ammo.item.id}`}
                            onChange={() => saveToProfile(ammo)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`save-${ammo.item.id}`}
                          >
                            Save
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      {selectedAmmoIds.length > 0 && (
        <button
          className="btn btn-dark btn-floating btn-sm rounded-circle position-fixed bottom-0 end-0 m-3"
          onClick={handleSubmit}
        >
          Add Ammo to Profile
        </button>
      )}
    </main>
  );
};

export default Home;
