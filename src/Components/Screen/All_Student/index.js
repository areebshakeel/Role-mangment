import React,{Component} from 'react'
import NavBar from '../../Utility/Navbar'
import * as firebase from "firebase/app";

class StudentData extends Component{
   constructor(props){
       super(props)
       this.state={
           studentInfo:[]
       }
   }
    componentDidMount(){
        const{studentInfo}=this.state
        
        var firebaseConfig = {
            apiKey: "AIzaSyAd7C7vZlvhY0BT3wza_lIP_YewMmywnEY",
            authDomain: "owais-1d9f6.firebaseapp.com",
            databaseURL: "https://owais-1d9f6.firebaseio.com",
            projectId: "owais-1d9f6",
            storageBucket: "owais-1d9f6.appspot.com",
            messagingSenderId: "267556268221",
            appId: "1:267556268221:web:57e64c0ee9871923",
          };
      
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);

          }
        
          firebase.firestore().collection('studentDetail').get().then((data)=>{
              data.forEach((docs)=>{
                  this.state.studentInfo.push(docs.data())
              })
              this.setState({
               studentInfo
              })
            })
               }
   
   
    
render(){

    const{studentInfo}=this.state
    return(<div style={{background:'lightBlue',backgroundSize:'cover',height:'100vh'}}>
               <NavBar/>
        <div style={{ backgroundColor: "lightgrey",width:'100%' }}>
          <h1 style={{ textAlign: "center",border:'solid black 2px' }}>Student Information</h1>
         
          

        </div>
        <div className='row ' style={{marginRight:'auto',marginLeft:"auto",}}>
        {studentInfo.map((item)=>{
            return <div style={{boxShadow:"grey 1px 2px 1px 1px",boxSizing:'border-box' ,marginTop:"1rem",background:'white' ,marginLeft:'1px' }} className='container-fluid col-md-4 col-sm-4 text-center' >
            <h1>STUDENT INFORMATION</h1>
            <p className='text-center'>{"NAME:"+item.name}</p>
            <p className='text-center'>{"EMAIL:"+item.email}</p>
            <p className='text-center'>{"Qulification:"+item.qualification}</p>


        </div>
       
        })}
      </div>
    

    </div>)
}

}
export default StudentData