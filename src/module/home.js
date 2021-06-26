import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getPost } from '../action';

const Home = ({ navigation }) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    loadAllPost()
  }, [])

  const loadAllPost = () => {
    getPost()
      .then(res => {
        console.log(res)
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        Alert.alert('Error', 'Fail to load posts')
      })
  }

  const onPressPost = (post) => () => {
    console.log('onpress', post);
    navigation.navigate('Detail', { id: post.id })
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={onPressPost(item)}>
        <View style={{ paddingVertical: 15, borderBottomWidth: 1, borderColor: '#EEE', }}>
          <Text style={styles.postNote}>{`USER ${item.userId}`}</Text>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postBody}>{item.body}</Text>
          <Text style={[styles.postNote, { textAlign: 'right' }]}>{`Read more`}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: '#FFF' }}>
      <FlatList
        data={data}
        refreshing={isLoading}
        onRefresh={loadAllPost}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Text style={styles.screenTitle}>{`Today's Post`}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  postBody: {
    fontSize: 15
  },
  postNote: {
    color: '#999'
  }
});

export default Home;