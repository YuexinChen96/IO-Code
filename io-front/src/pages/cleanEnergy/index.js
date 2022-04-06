import React from 'react';


class CleanEnergy extends React.Component{
    render(){
      var query ={
        pathname:'/Home', //当为exact或strict时，此处的pathname跟Route里的path要一致
        query:'这是query传值'
      }
      return(
        <div>
          <h1>这是一个根路由</h1>
          <ul>
            <li><Link to={query}>Home</Link></li>
            <li><Link to={{
                pathname: '/Download',
                state:'这是state传值'
                }}>Download</Link>
            </li>
            <li><Link to='/About/这是通配符传值'>About</Link></li>
          </ul>
        </div>
      )
    }
  }
   
  export default CleanEnergy;