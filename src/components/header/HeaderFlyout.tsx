import React from 'react'
import styled from '@emotion/styled'

type Props = {}

const FlyoutContainer = styled('div')`
  // position: absolute;
  // top: 0px;
  // left: 0px;
  // right: 0px;
  // bottom: 0px;
  border: 2px solid hotpink;
`

export default function HeaderFlyout({}: Props) {
  return (
    <FlyoutContainer>HeaderFlyout</FlyoutContainer>
  )
}