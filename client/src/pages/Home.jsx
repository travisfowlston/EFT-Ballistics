import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

const Home = () => {
  // Creates a state variable to store the ammo data
  const [ammoData, setAmmoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        query {
          ammo {
            item {
              id
              shortName
              name
            }
            caliber
            tracer
            projectileCount
            damage
            armorDamage
            fragmentationChance
            penetrationChance
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

  return (
    <main>
      <div className="container">
        {Object.keys(groupedAmmo).map((caliber) => (
          <table key={caliber} className="table">
            <caption>{`Ammo Types - Caliber: ${caliber}`}</caption>
            <thead>
              <tr>
                <th>Short Name</th>
                <th>Caliber</th>
                <th>Damage</th>
                <th>Armor Damage</th>
                <th>Fragmentation Chance</th>
                <th>Penetration Chance</th>
                <th>Accuracy Modifier</th>
                <th>Recoil Modifier</th>
              </tr>
            </thead>
            <tbody>
              {groupedAmmo[caliber].map((ammo) => (
                <tr key={ammo.item.id}>
                  <td>{ammo.item.shortName}</td>
                  <td>{ammo.caliber}</td>
                  <td>{ammo.damage}</td>
                  <td>{ammo.armorDamage}</td>
                  <td>{ammo.fragmentationChance}</td>
                  <td>{ammo.penetrationChance}</td>
                  <td>{ammo.accuracyModifier}</td>
                  <td>{ammo.recoilModifier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </main>
  );
};

export default Home;
