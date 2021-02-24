import './App.css';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const PAST_LAUNCHES = gql`
  query GetPastLaunces($numLaunches: Int!) {
    launchesPast(limit: $numLaunches) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
    }
  }
`;

function App() {
  const [numLaunches, setNumLaunches] = useState(10);
  
  const { loading, error, data } = useQuery(PAST_LAUNCHES, {
    variables: {
      numLaunches,
    },
  });

  if (loading) {
    return <p>loading...</p>
  }

  if (error) {
    return <p>are u dumb modafuka?</p>
  }

  return (
    <>
      <button onClick={() => setNumLaunches(5)}>Show 5</button>
      <ul>
        {data.launchesPast.map((launch) => (
          <li key={launch.mission_name}>
            <strong>{launch.mission_name}</strong>
            <ul>
              <li>
                Launch Date:{' '}
                {new Date(launch.launch_date_local).toLocaleDateString()}
              </li>
              <li>Rocket: {launch.rocket.rocket_name}</li>
              <li>Launch Site: {launch.launch_site.site_name_long}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
