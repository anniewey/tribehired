import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { getPostComment, getPostDetail } from '../action';

const Detail = ({ navigation, route }) => {
  const [data, setData] = useState([])
  const [dataComment, setDataComment] = useState([])
  const [dataCommentFiltered, setDataCommentFiltered] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [isLoadingComment, setLoadingComment] = useState(true)

  const navData = route.params

  useEffect(() => {
    console.log(route);
    loadPostDetail(navData.id)
    loadPostComment(navData.id)
  }, [])

  const loadPostDetail = (id) => {
    getPostDetail(id)
      .then(res => {
        console.log(res)
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        Alert.alert('Error', 'Fail to load post detail')
      })
  }

  const loadPostComment = (id) => {
    getPostComment(id)
      .then(res => {
        console.log(res)
        setDataComment(res)
        setLoadingComment(false)
      })
      .catch(err => {
        Alert.alert('Error', 'Fail to load post comment')
        setLoadingComment(false)
      })
  }

  const onChangeComment = (text) => {
    setSearchText(text)
    searchComment(text)
  }

  const searchComment = (text) => {
    const comments = [...dataComment]
    const filteredData = comments.filter(item => {
      const itemName = item.name.toUpperCase()
      const itemEmail = item.email.toUpperCase()
      const itemBody = item.body.toUpperCase()
      const itemSearch = text.toUpperCase()

      return itemName.includes(itemSearch) || itemEmail.includes(itemSearch) || itemBody.includes(itemSearch)
    })

    console.log(comments.filter(item => item.body.includes(text)));
    setDataCommentFiltered(filteredData)
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingVertical: 15, paddingHorizontal:5, borderBottomWidth: 1, borderColor: '#EEE' }}>
        <Text style={styles.commentTitle}>{item.name}</Text>
        <Text style={styles.commentNote}>{item.email}</Text>

        <Text style={styles.commentBody}>{item.body}</Text>
      </View>
    )
  }

  return (
    isLoading ? <ActivityIndicator size='large' style={styles.commentLoading}/> :
    <View style={{ flex: 1, padding: 15, backgroundColor: '#FFF' }}>
      <Text style={styles.postTitle}>{data?.title}</Text>
      <Text>{data?.body}</Text>

      <View style={styles.commentView}>
        <Text style={styles.commentLabel}>{`Comment`}</Text>
      </View>

      <View>
        <TextInput 
          placeholder={'Search comment'} 
          placeholderTextColor='#999'
          autoCorrect={false}
          onChangeText={onChangeComment}
          value={searchText}
          style={{borderWidth:1, borderColor:'#CCC', marginTop:10, minHeight:35, borderRadius:20, paddingHorizontal:10}}
        />
      </View>

      <FlatList
        data={searchText ?  dataCommentFiltered : dataComment}
        refreshing={isLoadingComment}
        onRefresh={loadPostComment}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyComment}>{`No comments found`}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15
  },
  commentNote: {
    color: '#999',
    marginBottom: 10
  },
  commentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal:10
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentBody: {
    fontSize: 15,
  },
  commentView:{
    backgroundColor: '#EEE', 
    marginTop: 20
  },
  commentLoading:{
    marginTop: 20
  },
  emptyComment:{
    marginTop: 10,
    paddingHorizontal: 5
  }
});

export default Detail;