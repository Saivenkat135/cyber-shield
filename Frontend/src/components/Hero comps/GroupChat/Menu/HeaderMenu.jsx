import { styled, Box, Typography ,MenuItem} from "@mui/material";

// const MenuOption = styled(MenuItem)`
//     font-size: 354px
//     // padding: 15px 60px 5px 24px;
//     color: #4A4A4A;
// `;

const HeaderContainer = styled(Box)`
    width: 100%;
    background: linear-gradient(135deg, #f9f9f9, #e3e3e3);
    // padding: 15px 60px 5px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #ccc;
`;

const HeaderTitle = styled(Typography)`
    font-size: 34px;
    // font-weight: bold;
    color:rgb(45, 45, 45);
    font-family: 'CursiveStyledMN';  // Change this to your preferred font
`;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 5vh;
    width: 98%;
    background: #f1f1f1;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 9px;
    overflow: hidden;
`;

const HeaderMenu = () => {
    return (
        <Container>
            <HeaderContainer>
                <HeaderTitle>Safe Chat</HeaderTitle>
            </HeaderContainer>
        </Container>
    );
};

export default HeaderMenu;