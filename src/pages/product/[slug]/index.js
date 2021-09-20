import React from "react"
import { graphql } from "gatsby"

export default function Product(props) {
  return (
    <>
    {props.params.slug} // highlight-line
    <h1>dfsd</h1>
    </>
  )
}