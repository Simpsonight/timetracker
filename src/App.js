import TimeAdd from "./components/TimeAdd/TimeAdd";

const data = {
  customers: [
    {
      id: 1,
      customer: 'Kunde 1',
      jobs: [
        {
          id: 1,
          name: 'Kunde 1 - Job 1'
        },
        {
          id: 2,
          name: 'Kunde 1 - Job 2'
        }
      ]
    },
    {
      id: 2,
      customer: 'Kunde 2',
      jobs: [
        {
          id: 1,
          name: 'Kunde 2 - Job 1'
        },
        {
          id: 2,
          name: 'Kunde 2 - Job 2'
        }
      ]
    },
    {
      id: 3,
      customer: 'Kunde 3',
      jobs: [
        {
          id: 1,
          name: 'Kunde 3 - Job 1'
        },
        {
          id: 2,
          name: 'Kunde 3 - Job 2'
        }
      ]
    }
  ]
}

const App = () => {
  return (
    <div className="App">
      <h1>Timetracker</h1>
      <TimeAdd data={data} />
    </div>
  );
}

export default App;
