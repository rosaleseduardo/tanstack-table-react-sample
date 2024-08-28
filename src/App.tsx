import {
  BasicAutomaticPaginationTable,
  BasicControlledPaginationTable,
  CRUDAutomaticPaginationTable,
  CRUDControlledPaginationTable,
} from './components';

/**
 * Renders the main application component.
 *
 * @returns The JSX element representing the application.
 */
function App(): JSX.Element {
  return (
    <>
      <BasicAutomaticPaginationTable />
      <BasicControlledPaginationTable />
      <CRUDAutomaticPaginationTable />
      <CRUDControlledPaginationTable />
    </>
  );
}

export default App;
