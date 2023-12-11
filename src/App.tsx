import React from 'react';
import { Button } from '@mui/material'
import styled from '@emotion/styled'

const StyledButton = styled(Button)`
  // background: green;
`

function App() {
  return (
    <div>
      <h1>App component</h1>
      <StyledButton variant='contained'>Click me</StyledButton>
    </div>
  );
}

export default App;
