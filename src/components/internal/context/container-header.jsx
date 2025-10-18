import {createContext, useContext} from 'react'

const ContainerHeaderContext = createContext({isInContainer: false})
const ContainerHeaderContextProvider = ({children}) => {
  return (
    <ContainerHeaderContext.Provider value={{isInContainer: true}}>
      {children}
    </ContainerHeaderContext.Provider>
  )
}
const useContainerHeader = () => {
  const {isInContainer} = useContext(ContainerHeaderContext)
  return isInContainer
}

export {
  ContainerHeaderContextProvider,
  useContainerHeader
}
