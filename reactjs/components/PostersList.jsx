import React from "react"

export default class PostersList extends React.Component {
  render() {
    let {posters} = this.props
    let postNodes = []
    posters.forEach((item, index) => {
      let node = (
        <div >{item.title} || {item.text}</div>
      )
      postNodes.push(node)
    })

    return (
      <div>{postNodes}</div>
    )
  }
}