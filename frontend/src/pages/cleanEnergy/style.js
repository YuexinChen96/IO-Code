import styled from 'styled-components';
import logo from '../../statics/io-dashboard-logo.png';
import threeLines from '../../statics/threelines.jpg';
import changeBG from '../../statics/ChangeBG.png';


export const DashboardWrapper = styled.div`
	position: absolute;
	z-index: 0;
	width: 100%;
	height: auto;
	top: 0;
	background: rgb(255,255,255);
    font-family: Montserrat, Helvetica, Sans Serif;
    color: #2B265A
`

export const DashboardNavigator = styled.div`
    z-index: 0;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 80px;
    background: rgb(255,255,255);
    position: fixed;
    height: 100%;
    overflow: auto;
    border-style: none solid none none;
    border-color: #e7edf2;
    border-width: 2px;
    display: flex;
    flex-direction: column;
`

export const DashboardLogo = styled.div`
    margin: 40px 20px 40px 20px;
    height: 40px;
    width: 40px;
    background-image: url(${logo});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`

export const DashboardBox1 = styled.div`
    width: 78px;
    height: 60px;
    background-color: #e7edf2;
    border-color: red;
    border-style: none solid none none;
    border-width: 2px;
    display: flex;
    flex-direction: column;
`
export const DashboardBox2 = styled.div`
    width: 78px;
    height: 60px;
    background-color: white;
    display: flex;
    flex-direction: column;
`
export const Boxcircle = styled.div`
    width: 16px;
    height: 16px;
    margin-left: 31px;
    margin-top: 22px;
    border-radius: 50%;
    background-color: red;
`
export const Boxcircle2 = styled.div`
    width: 16px;
    height: 16px;
    margin-left: 31px;
    margin-top: 22px;
    border-radius: 50%;
    background-color: grey;
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 150px;
    width: 85%;
`

export const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    //background-color: grey;
    margin: 50px 0px 50px 0px;
    width: 100%;
    height: 40px;
`
export const WelcomeThreeLines = styled.div`
    margin: 0px 30px 0px 0px; //上右下左
    height: 20px;
    width: 20px;
    background-image: url(${threeLines});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`

export const WelcomeText = styled.div`

`

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0px 50px 0px;
    width: 100%;
    height: 60px;
`

export const SelectText = styled.div`
    // margin-top: 10px;
    // margin-bottom: 34px;
    font-size: 40px;
    margin: 10px 0px 0px 0px;
    color: #2B265A;
    font-weight: bold;
    height:60px;

`

//average hourly use
export const Context1 = styled.div`
    height: 30px;
    font-size: 26px;
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 34px;   
`

export const RecommmendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${changeBG});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 390px;
    width: 100%;
    border-color: #81F1C5;
    //border-color: #E7EDF2;
    border-style: solid;
    border-width: 2px;
    border-radius: 17%;
`

export const PlanTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    //background-color: white;
    height:150px;
    width:250px;
    margin-top:10%;
`

export const PlanText = styled.div`
    text-align:center;
`
export const ChangePlanButton = styled.button`
	margin-top:10%;
    background-color: white;
    width: 200px;
    height: 50px;
    border-color: #81F1C5;
    font-color: #AEC0D0;
    font-weight: bold;
    font-size: 20px;
    border-radius: 25px;
    border-style: solid;
    border-width: 2px;
`

//"Energy Sources" container

export const EnergySourcesWrapper = styled.div`
    display: grid;
    margin-top: 100px; // increase margin to increase the gap to the recommended plan container.
    width: 95%;
    height:500px;
`

export const Context2 = styled.div`
    height: 30px;
    font-size: 26px;
    font-color: 'black';
    font-weight: bold;
    margin-top: 30px;
    margin-bottom: 5px;
`
// export const UsageText = styled.div`
//   font-size: 18px;
//   color: #AEC0D0;
// `
export const EnergySourceGraph = styled.div`
    padding: 10px;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    align-items: center;
    background-color: #FFF3F8;
    border-radius: 15px;
`

export const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width:  100%;
    height: 100%;`

export const ContentLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 100%;
    margin-bottom: 60px; //add blank space at the bottom
`

export const ContentRight = styled.div`
    width: 25%;
    height:100%;
    // height: 1500px;
     //background-color: black;
    padding: 0 10px 0 30px;
`

export const GraphGraph = styled.div`
    margin-top: 30px;
    padding: 50px 35px 50px 35px;
    align-items: center;
    border-color: #E7EDF2;
    border-style: solid;
    border-width: 2px;
    border-radius: 15px;
`