import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DataTable from '../components/DataTable'

describe('DataTable Component', () => {
  it('debería mostrar Spinner cuando loading es true', () => {
    render(<DataTable loading={true} />)
    const spinnerElement = screen.getByTestId('loading-data-table')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('debería mostrar mensaje de error cuando error es true', () => {
    render(<DataTable error={true} />)
    const emojiElement = screen.getByTestId('error-data-table')
    const errorMessageElement = screen.getByText(
      'No se pudo obtener resultados'
    )
    expect(emojiElement).toBeInTheDocument()
    expect(errorMessageElement).toBeInTheDocument()
  })

  it('debería mostrar la tabla cuando loading y error son false', () => {
    render(<DataTable data={mockData} />)
    const tableElement = screen.getByRole('table')
    expect(tableElement).toBeInTheDocument()
  })

  it('debería mostrar datos en la tabla cuando loading y error son false', () => {
    render(<DataTable data={mockData} />)
    const tableRowElements = screen.getAllByRole('row')
    // Verifica que haya filas de datos en la tabla
    expect(tableRowElements.length).toBeGreaterThan(1)
  })
})

const mockData = [
  {
    file: 'example.txt',
    lines: [
      { text: 'Line 1', number: '1', hex: '0x01' },
      { text: 'Line 2', number: '2', hex: '0x02' }
    ]
  }
]
