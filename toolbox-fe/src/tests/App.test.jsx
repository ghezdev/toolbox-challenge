import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App, { DEFAULT_OPTION } from '../App'
import {
  useFetchFilesDataQuery,
  useFetchFilesListQuery
} from '../store/api/files'

jest.mock('../store/api/files')

describe('App', () => {
  beforeEach(() => {
    useFetchFilesDataQuery.mockReturnValue({
      data: [],
      isFetching: false,
      isError: false
    })

    useFetchFilesListQuery.mockReturnValue({
      data: [],
      isLoading: false
    })
  })

  it('debería mostrar "Select a file" en el selector por defecto', () => {
    render(<App />)
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveValue(DEFAULT_OPTION)
  })

  it('debería mostrar opciones en el selector cuando se cargan los nombres de archivos', async () => {
    useFetchFilesListQuery.mockReturnValue({
      data: ['file1.txt', 'file2.txt'],
      isLoading: false
    })

    render(<App />)

    await waitFor(() => {
      const file1Option = screen.getByText('file1')
      const file2Option = screen.getByText('file2')

      expect(file1Option).toBeInTheDocument()
      expect(file2Option).toBeInTheDocument()
    })
  })

  it('debería cargar y mostrar los datos de archivos cuando se selecciona una opción', async () => {
    useFetchFilesDataQuery.mockReturnValue({
      data: [
        { file: 'file1.txt', lines: [] },
        { file: 'file2.txt', lines: [] }
      ],
      isFetching: false,
      isError: false
    })

    useFetchFilesListQuery.mockReturnValue({
      data: ['file1.txt'],
      isLoading: false
    })

    render(<App />)

    const selectElement = screen.getByRole('combobox')
    userEvent.selectOptions(selectElement, 'file1')

    await waitFor(() => {
      const file1Row = screen.getByText('file1')
      const file2Row = screen.queryByText('file2')

      expect(file1Row).toBeInTheDocument()
      expect(file2Row).toBeNull()
    })
  })
})
