import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Spinner, Table } from 'react-bootstrap'
import { BsFileEarmarkExcelFill } from 'react-icons/bs'

const DataTable = ({ data, loading = false, error = false }) => {
  const files = useMemo(
    () => (data?.length > 0 ? prettierFiles(data) : []),
    [data]
  )

  if (loading) {
    return (
      <div
        data-testid='loading-data-table'
        className='h-100 d-flex flex-column justify-content-center align-items-center'
      >
        <Spinner animation='border' variant='dark' />
      </div>
    )
  }

  if (error) {
    return (
      <div
        data-testid='error-data-table'
        className='h-100 d-flex flex-column justify-content-center align-items-center'
      >
        <BsFileEarmarkExcelFill size={100} />
        <p className='mt-3'>No se pudo obtener resultados</p>
      </div>
    )
  }

  return (
    <Table
      data-testid='data-table'
      striped
      bordered
      hover
      responsive
      className='mt-3'
    >
      <thead>
        <tr>
          <th>File name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files.map(({ file, text, number, hex }, index) => (
          <tr key={`${file}-${index}`}>
            <td>{file || '-'}</td>
            <td>{text || '-'}</td>
            <td>{number || '-'}</td>
            <td>{hex || '-'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const prettierFiles = files => {
  const filesFormatted = files
    .map(({ file, lines }) => {
      const linesFormatted = lines.map(({ text, number, hex }) => ({
        file: file.split('.')[0],
        text,
        number,
        hex
      }))

      return linesFormatted
    })
    .flat()

  return filesFormatted
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.string,
      lines: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          number: PropTypes.string,
          hex: PropTypes.string
        })
      )
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.bool
}

export default DataTable
