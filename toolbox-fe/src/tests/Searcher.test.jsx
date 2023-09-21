import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Searcher from '../components/Searcher'

describe('Searcher', () => {
  const onChangeMock = jest.fn()
  it('debería mostrar "Loading..." cuando loading es true', () => {
    render(<Searcher loading={true} onChange={onChangeMock} />)
    const loadingOption = screen.getByText('Loading...')
    expect(loadingOption).toBeInTheDocument()
  })

  it('debería mostrar las opciones correctamente cuando loading es false', () => {
    const options = ['file1.csv', 'file2.csv', 'file3.csv']
    render(
      <Searcher loading={false} options={options} onChange={onChangeMock} />
    )

    options.forEach(option => {
      const optionElement = screen.getByText(option.split('.')[0])
      expect(optionElement).toBeInTheDocument()
    })
  })

  it('debería llamar a la función onChange cuando se selecciona una opción', () => {
    const options = ['file1.csv', 'file2.csv', 'file3.csv']
    render(
      <Searcher loading={false} options={options} onChange={onChangeMock} />
    )

    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: 'file2.csv' } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith('file2.csv')
  })
})
