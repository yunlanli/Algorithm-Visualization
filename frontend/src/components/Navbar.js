import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 1.75rem;
    /* position: fixed;
    top: 0px; */
    font-size: 1rem;
    margin-bottom: 1rem;
    background-color: beige;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Header = styled.a`
    text-align: center;
    margin: 0 2rem 0 2rem;
`;

const sectionList = ["Sorting", "Graphs", "Data Structures"];

const Section = (sections) => {
    return sections.map( (sectionName) => {
        return <Header> {sectionName} </Header>;
    });
}

const Navbar = () => {
    return (
        <Wrapper>
                <Header> Algorithm Visualization </Header>
                {Section(sectionList)}
        </Wrapper>
    )
}

export default Navbar;