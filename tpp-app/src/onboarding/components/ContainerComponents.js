import styled from "styled-components";

// Container for the skip & start buttons on the onboarding pages
export const TwoButtonContainer = styled.SafeAreaView`
  flex-direction: row;
  align-self: center;
  justify-content: center;
  position: absolute;
  bottom: 5%;
  width: 100%;
`;

// Container for the back arrow button in the top-left corner
export const BackButtonContainer = styled.SafeAreaView`
  alignitems: stretch;
  borderradius: 10px;
  position: absolute;
  left: 10px;
  top: 5%;
  flexdirection: row;
`;

// Lines on the success page
export const HorizontalLine = styled.SafeAreaView`
  borderbottomcolor: #cfcfcf;
  borderbottomwidth: 1px;
`;

// Border for the boxes on the registration pages
export const InputBorderContainer = styled.View`
  alignself: center;
  width: 90%;
  height: 80px;
  borderwidth: 2px;
  bordercolor: #5a9f93;
  borderradius: 10px;
  backgroundcolor: #ffffff;
  padding: 18px;
  margintop: 200px;
`;

// Container for the input boxes on onboarding pages
export const InputContainer = styled.SafeAreaView`
  alignself: center;
  width: 50%;
  height: 8%;
  borderradius: 10px;
  backgroundcolor: #ffffff;
`;

// Container for the title of the page at the top
export const PageTitleContainer = styled.SafeAreaView`
  width: 85%;
  height: 40px;
`;

// Last row on the success page for multiple icons
export const SymptomIconContainer = styled.SafeAreaView`
  margin-top: 4px;
  flex-direction: row;
  align-self: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

// Container for text and button in the same line
export const TextButtonContainer = styled.SafeAreaView`
  flexdirection: row;
  alignself: center;
  bottom: -35%;
`;

export const SymptomsButtonContainer = styled.SafeAreaView`
  flex-direction: row;
  align-self: center;
  justify-content: space-evenly;
  width: 90%;
  position: absolute;
  bottom: 20%;
  margin-top: 20px;
`;
