import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

const Home = () => {
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

  return (
    <main>
      <div className="container">
        <table className="table">
          <caption>Ammo Types</caption>
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
            {ammoData.map((ammo) => (
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
      </div>
    </main>
  );
};

export default Home;
