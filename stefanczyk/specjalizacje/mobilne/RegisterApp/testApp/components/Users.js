import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import MyButton from './MyButton';
import ListItem from './ListItem';
import { colors, IP, PORT } from './settings'

const Users = ({ navigation }) => {

  const [users, setUsers] = useState([])

  const getUsersArray = async function () {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(`http://${IP}:${PORT}/getusers`, options)
    if (!response.ok) {
      console.log(response.status);
    } else {
      const result = await response.json()
      // console.log(result);
      setUsers(result)
    }
  }

  const deleteUser = async function (id) {

    const options = {
      method: 'POST',
      body: JSON.stringify({ userId: id }),
      headers: { 'Content-Type': 'application/json' }
    }

    const response = await fetch(`http://${IP}:${PORT}/deleteuser`, options)

    if (!response.ok) {
      console.log(response.status);
    } else {
      const result = await response.json()
      console.log(result);
      setUsers(result)
    }

  }


  useEffect(() => {
    getUsersArray()
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <MyButton color={colors.primary} text={"BACK TO LOGIN PAGE"} height={30} width={200} action={() => navigation.navigate('main')} />
      </View>
      <View style={styles.usersListContainer}>
        <FlatList
          data={users}
          style={{ flex: 1, width: "100%" }}
          renderItem={({ item }) => <ListItem id={item.id} login={item.login} password={item.password} date={item.date} navigation={navigation} key={item.id} deleteUser={deleteUser} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1, alignItems: "center", justifyContent: "center", margin: 20
  },
  usersListContainer: {
    flex: 15, alignItems: "center", gap: 30
  }
})


export default Users