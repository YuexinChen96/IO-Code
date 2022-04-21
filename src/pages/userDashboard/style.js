import styled from 'styled-components';
import logo from '../../statics/io-dashboard-logo.png';
import threeLines from '../../statics/threelines.jpg';
import changeBG from '../../statics/ChangeBG.png';
import planBG from '../../statics/PlanBG.png';

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
    margin: 50px 0px 20px 0px;
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

export const TabBar = styled.div`
    width: 100%;
    height: 52px;
    border: 2px solid;
    border-radius: 10px;
    border-color: #e7edf2;
    background-color: white;
    margin-bottom: 10px;
    font-size: 28px;
    padding-top: 21px;
    padding-left: 30px;
    font-weight: 600;
`


export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0px 50px 0px;
    width: 100%;
    height: 60px;
`

export const SelectBox = styled.div`
    position: relative;
    width: 360px;
    height: 480px;
    // z-index: 1;
`

export const SelectButton = styled.button`
    margin-left: 220px;
	margin-top:5px;
    margin-bottom: 20px;
    background-color: #81F1C5;
    width: 140px;
    height: 50px;
    color: white;
    font-weight: bold;
    font-size:18px;
    border-radius: 10px;
    border: none;
`

export const SelectText = styled.div`
    margin-top: 10px;
    font-size: 40px;
    height: 100%;
    color: #2B265A;
`

export const BoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 100%;
    height: 300px;
`

export const Box = styled.div`
    padding: 30px 30px 30px 30px;
    width: 32%;
    background-color: #F6F5FF;
    border-radius: 15px;
`

export const Box1 = styled.div`
    padding: 30px 30px 30px 30px;
    width: 32%;
    margin-left: 4%;
    background-image: url(${planBG});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 15px;

`

export const Box2 = styled.div`
    padding: 30px 30px 30px 30px;
    width: 32%;
    margin-left: 4%;
    background-color: #FFF3F8;
    border-radius: 15px;
`

export const BoxContent = styled.div`
    display: flex;
    flex-direction: column;
`

export const BoxBar = styled.div`
    width: 100%;
    height: 16px;
    border: none;
    border-radius: 10px;
    background-color: white;
`
export const BoxBarFill = styled.div`
    width: 60%;
    border-radius: 10px;
    height: 100%;
`

export const BoxText1 = styled.div`
    font-size: 16px;
    color: #AEC0D0;
`

export const BoxText2 = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    font-size: 42px;
    font-weight: 600;
`
//average hourly use
export const Context1 = styled.div`
    height: 30px;
    font-size: 28px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 30px;   
`

export const GraphWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 840px;
    border-color: #E7EDF2;
    border-style: solid;
    border-width: 2px;
    border-radius: 15px;
`

export const GraphContextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
`

export const GraphContext = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-top: 30px;
    margin-left: 30px;
    height: 100px;
`

export const BillContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 35%;
    margin-top: 30px;
    margin-left: 30px;
    font-size: 15px;
    color: black;
    font-weight: 600;
`

export const GraphGraph = styled.div`
    margin-top: 60px;
    width: 100%;
    height: 600px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
`
//bill history
export const BottomWrapper = styled.div`
    height: 560px;
    display: flex;
    flex-direction: row;
`

export const BottomLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 500px;
    margin-right: 10%;
`

export const LeftTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
    border-style: none none solid none;
    border-color:#E7EDF2;
    border-width: 1px;
`
export const BillContextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 65px;
    border-style: none none solid none;
    border-color:#E7EDF2;
    border-width: 1px;
`
//plan promotion
export const BottomRight = styled.div`
    width: 390px;
    height: 500px;
    //background-color: black;
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
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin-top: 40px;
`

export const PlanText = styled.div`
    width: 60%;
    text-align:center;
`
export const ChangePlanButton = styled.button`
	margin-top:10%;
    background-color: white;
    width: 200px;
    height: 50px;
    // z-index: 1;
    border-color: #81F1C5;
    font-color: #AEC0D0;
    font-weight: bold;
    font-size: 20px;
    border-radius: 25px;
    border-style: solid;
    border-width: 2px;

`
export const ColorRed = styled.div`
    color: #FF127F;
`
