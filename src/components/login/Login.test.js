import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Login from "./Login"

jest.mock('axios', () => ({
    __esModule:true,

    default:{
        get: () => ({
            data: {id: 1, name: 'John'}
        })
    }

}))

test('username input should be rendered', () => {
    render(<Login />)
    const userInput = screen.getByPlaceholderText(/username/i)
    expect(userInput).toBeInTheDocument()
    
})
test('password input should be rendered', () => {
    render(<Login />)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
    
})
test('button should be rendered', () => {
    render(<Login />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
})

test('username input should be empty', () => {
    render(<Login />)
    const username = screen.getByPlaceholderText(/username/i)
    expect(username.value).toBe('')
    
})
test('password input should be empty', () => {
    render(<Login />)
    const password = screen.getByPlaceholderText(/password/i)
    expect(password.value).toBe('')
    
})

test('button should be disabled', () => {
    render(<Login />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    
})

test('loading should not be rendered', () => {
    render(<Login />)
    const button = screen.getByRole('button')
    expect(button).not.toHaveTextContent(/please wait/i)
    
})

test('error message should not be visible', () => {
    render(<Login />)
    const errorMsg = screen.getByTestId('error')
    expect(errorMsg).not.toBeVisible()
})


test('username input should be change', () => {
    render(<Login />)
    const username = screen.getByPlaceholderText(/username/i)
    const usernameValue = 'test'


    fireEvent.change(username, {target: {value: usernameValue}})
    expect(username.value).toBe(usernameValue)
    
})

test('password input should be change', () => {
    render(<Login />)
    const password = screen.getByPlaceholderText(/password/i)

    const passwordValue = 'password'
    fireEvent.change(password, {target: {value: passwordValue}})
    expect(password.value).toBe(passwordValue)
    
})


test('button should not be disabled when input exits', () => {
    render(<Login />)
    const button = screen.getByRole('button')

    const username = screen.getByPlaceholderText(/username/i)
    const password = screen.getByPlaceholderText(/password/i)

    const testValue = 'test'

    fireEvent.change(username, {target: {value: testValue}})
    fireEvent.change(password, {target: {value: testValue}})


    expect(button).not.toBeDisabled()
    
})

test('loading should  be rendered when clicked', () => {
    render(<Login />)
    const button = screen.getByRole('button')
    const username = screen.getByPlaceholderText(/username/i)
    const password = screen.getByPlaceholderText(/password/i)

    const testValue = 'test'

    fireEvent.change(username, {target: {value: testValue}})
    fireEvent.change(password, {target: {value: testValue}})
    fireEvent.click(button )


    expect(button).toHaveTextContent(/please wait/i)
    
})


test('loading should not be rendered after fetched', async() => {
    render(<Login />)
    const button = screen.getByRole('button')
    const username = screen.getByPlaceholderText(/username/i)
    const password = screen.getByPlaceholderText(/password/i)

    const testValue = 'test'

    fireEvent.change(username, {target: {value: testValue}})
    fireEvent.change(password, {target: {value: testValue}})
    fireEvent.click(button)

    const userItem = await screen.findByText('John')

    expect(userItem).toBeInTheDocument()
    
    
})