import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Register from './Register'
import Login from './Login'

const UserValidation = ({ setToken }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Register</Tab>
        <Tab>Login</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Register />
        </TabPanel>
        <TabPanel>
          <Login setToken={setToken} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default UserValidation
