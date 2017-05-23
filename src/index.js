
const root = document.getElementById('root')

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import Upload from 'antd/lib/upload'

class TestUpload extends Component{

  render(){

    return(
      <div>
        <Upload>
          上传
        </Upload>
      </div>
    )
  }
}

ReactDOM.render((
  <TestUpload/>
),root)
