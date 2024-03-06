
import { useEffect } from 'react';
import { request, gql } from 'graphql-request';
const Home = () => {
  // const { loading, data } = useQuery(QUERY_PROFILES);
  // const profiles = data?.profiles || [];
  useEffect(() => {
    const fetchData = async () => {
      const query = gql`
        query {
          ammo{
            lightBleedModifier
            armorDamage
            penetrationPower
            caliber
            damage
            tracerColor
        }}`
      ;

      try {
        const data = await request('https://api.tarkov.dev/graphql', query);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts
  // This is where we will return the AmmoList component from the Tarkov API
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {'loading' ? (
            <div>Loading...</div>
          ) : (
            // <ProfileList
            //   profiles={profiles}
            //   title="Here's the current roster of friends..."
            // />
          ''
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
