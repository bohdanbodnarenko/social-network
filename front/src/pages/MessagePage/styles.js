import styled from 'styled-components'

export const MessagesWrapper = styled.div `
    width:98vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    background: red;
    margin:10px auto;
    height:89vh;
    background-color: #222222;
    position:relative;
    border-radius:10px;
`

export const MessagesContainer = styled.div `
    display:flex;
    flex-direction:column;
    max-height:100%;
    overflow-y:scroll;
    width: 100%;
    height: 100%;
    padding:15px 10px;
    position:relative;
    padding-bottom:80px;    
`