import { createContext } from "react"
import LandingPage from "../components/LandingPage"
import { ProductProvider } from "../contexts/ProductContext"

const About = () => {
  const {name} = createContext(ProductProvider)
  return (
    <>
    {name}
    <LandingPage name={"Shoporia Ecommerce"}/>
    </>
  )
}

export default About