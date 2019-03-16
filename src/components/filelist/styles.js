import styled from 'styled-components';

export const Container = styled.ul`
    margin-top: 20px;
    
    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;
        border-bottom: solid 1px #e9e9e9; 
        padding: 10px 5px 10px 15px;

        & + li {
            margin-top: 25px;
        } 
    }
`

export const FileInfo = styled.div`
    display: flex;
    align-items: initial;
    justify-content: flex-start;

    div {
        display: flex;
        flex-direction: column;

        span {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 150px;
            font-size: 12px;
            color: #999;
            margin-top: 5px;
            text-overflow: ellipsis;
        }
        span.error {
            color: #e57878;
        }
    }

    @media (min-width: 641px) {
        
        div {
                padding-top: 10px;
            }
    }

`


export const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    svg{         
        transition: all .5s ease-in-out;
    }
    button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
    }
    @media (max-width: 450px)  {
        svg {
            width: 18px;
            height: 18px;
        }
    }
    @media (min-width: 450px) and (max-width: 640px)  {
        svg {
            width: 22px;
            height: 22px;
        }
    }
    @media (min-width: 641px) {
        svg {
            width: 30px;
            height: 30px;
        }
    }
`
export const Preview = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 5px;
    background-image: url('${props => props.src}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    margin-right: 10px;

    transition: all .5s ease-in-out;

    

    @media (max-width: 450px)  {
        width: 35px;
        height: 35px;
    }
    @media (min-width: 450px) and (max-width: 640px)  {
        width: 50px;
        height: 50px;
    }
    @media (min-width: 641px) {
        width: 150px;
        height: 150px;
    }
`