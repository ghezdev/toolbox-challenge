import { useMemo, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import DataTable from './components/DataTable'
import Searcher from './components/Searcher'
import {
  useFetchFilesDataQuery,
  useFetchFilesListQuery
} from './store/api/files'

function App () {
  const [optionSelected, setOptionSelected] = useState(undefined)

  const { data: fileNames, isLoading: isLoadingFileNames } =
    useFetchFilesListQuery()
  const {
    data: files,
    isFetching: isLoadingFiles,
    isError: isErrorFiles,
    error: errorFiles
  } = useFetchFilesDataQuery(optionSelected)

  const handleOnChangeSearcher = option => {
    setOptionSelected(option === DEFAULT_OPTION ? undefined : option)
  }

  const options = useMemo(
    () =>
      fileNames?.length > 0 ? [DEFAULT_OPTION, ...fileNames] : [DEFAULT_OPTION],
    [fileNames]
  )

  return (
    <div className='vh-100 d-flex flex-column'>
      <Navbar
        bg='dark'
        data-bs-theme='dark'
        expand='lg'
        className='bg-body-tertiary'
      >
        <Container>
          <Navbar.Brand>List of files</Navbar.Brand>
          <Searcher
            options={options}
            loading={isLoadingFileNames}
            onChange={handleOnChangeSearcher}
          />
        </Container>
      </Navbar>
      <Container className='flex-grow-1'>
        <DataTable data={files} loading={isLoadingFiles} error={isErrorFiles} />
      </Container>
    </div>
  )
}

const DEFAULT_OPTION = 'Select a file'

export default App
