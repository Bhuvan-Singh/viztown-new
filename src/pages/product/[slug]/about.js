import React from 'react'

export default function about(props) {
    console.log(props.location.search)
    return (
        <>
        {props.params.slug} // highlight-line
        <h1>About Page</h1>
        </>
      )
}
