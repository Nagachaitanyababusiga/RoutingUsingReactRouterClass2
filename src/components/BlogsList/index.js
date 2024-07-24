import {Component} from 'react'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const data = await fetch('https://apis.ccbp.in/blogs')
    const parsedData = await data.json()
    const updatedData = parsedData.map(x => ({
      id: x.id,
      title: x.title,
      topic: x.topic,
      author: x.author,
      imageUrl: x.image_url,
      avatarUrl: x.avatar_url,
    }))
    this.setState({blogsData: updatedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
