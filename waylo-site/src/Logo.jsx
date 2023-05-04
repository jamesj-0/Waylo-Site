import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Svg = styled(Icon)` 
`

export const Logo = ({ className }) => ( 
  <Svg style={{ position: 'absolute', bottom: 40, left: 40, width: 40 }} viewBox="0 0 878 703" className={className}>   
   <path d="M99 703L0 17L154 18L228.5 630.5L328 209H551L650.5 630L725 18H878L779 703H540L439.5 301L338 703H99Z" fill="black"/>
   <circle cx="439" cy="95" r="95" fill="black"/>
  </Svg>
)

