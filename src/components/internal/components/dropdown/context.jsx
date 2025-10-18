import {useContext, createContext} from 'react'

const DropdownContext = createContext({
  position: 'bottom-right'
})
const DropdownContextProvider = ({children, position = 'bottom-right'}) => {
  return (
    <DropdownContext.Provider value={{position}}>
      {children}
    </DropdownContext.Provider>
  )
}

const useDropdownContext = () => {
  return useContext(DropdownContext)
}

export {
  DropdownContextProvider,
  useDropdownContext
}
