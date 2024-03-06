import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
} from "@chakra-ui/react";

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
      <Box>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Ammo Types</TableCaption>
            <Thead>
              <Tr>
                <Th>Short Name</Th>
                <Th>Caliber</Th>
                <Th>Damage</Th>
                <Th>Armor Damage</Th>
                <Th>Fragmentation Chance</Th>
                <Th>Penetration Chance</Th>
                <Th>Accuracy Modifier</Th>
                <Th>Recoil Modifier</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ammoData.map((ammo) => (
                <Tr key={ammo.item.id}>
                  <Td>{ammo.item.shortName}</Td>
                  <Td>{ammo.caliber}</Td>
                  <Td>{ammo.damage}</Td>
                  <Td>{ammo.armorDamage}</Td>
                  <Td>{ammo.fragmentationChance}</Td>
                  <Td>{ammo.penetrationChance}</Td>
                  <Td>{ammo.accuracyModifier}</Td>
                  <Td>{ammo.recoilModifier}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </main>
  );
};

export default Home;
