import React ,{ Component} from 'react';

import './App.css';

class App extends Component {
  state={
    searchData:null,
    text:null,
    post:[],
    index:0,
    blurvalue:0,
  }




    search=key=>{

        const value=key.target.value
        console.warn("value=",value)
        this.setState({text:value},()=>{
          if(value && value.length>2 ){
          let  url='https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name='+value;
          fetch(url).then((resp)=>{
            resp.json().then((data)=>{
              if(data.data.result.length){
                this.setState({searchData:data.data.result.slice(0,5)},()=>{
                   this.setState({text:null})
                })
              }
             
            })
          })}
          else{
            //this.setState({text:null})
            this.setState({searchData:null})
          }
        })
        
        }

         KeyControls=e=> {
     
    if (e.key === 'Enter') {
      console.log('do validate');
      console.log(this)
      console.log(this.state.text)
      this.setState({
        post:this.text,
        searchData:null
      },()=>{
        console.log(this.post)
      })
    }
    else if(e.keyCode=='40'){
      this.setState({
        text:this.state.searchData[this.state.index].name,
        index:(this.state.index+1)%(this.state.searchData.length),
      },()=> console.log(this.state.index))
    }
  }



        suggestionSelect(value){

          this.setState({
            searchData:null,
            text:value
          })
          console.log(this.state.text)
        }

        myblur=()=>{
          this.setState({
            
            
            index:0,
            blurvalue:0
          })
          console.log("scs")
        }


        myfocus=()=>{
          this.setState({
            blurvalue:1
          })
        }


        render() {

           var result;
          if((this.state.text==null || this.state.text=='') && this.state.blurvalue==1 && this.state.searchData==null)
          {
             result=( <div><div className="Defaultsearch">Popular Cities </div>
               <div className="AutoSuggest"><i className="material-icons AutoSuggestloc">location_on</i>London </div>
                <div className="AutoSuggest"><i className="material-icons AutoSuggestloc">location_on</i>Paris </div>
                 <div className="AutoSuggest"><i className="material-icons AutoSuggestloc">location_on</i>NewYork </div>
                  <div className="AutoSuggest"><i className="material-icons AutoSuggestloc">location_on</i>Bangalore</div>
                   <div className="AutoSuggest"><i className="material-icons AutoSuggestloc">location_on</i>Seattle </div></div>) 
          }
          else if(this.state.searchData==null && this.state.blurvalue==1){
            result= (<div className="Defaultitem">
                  Please Enter three or more letters

              </div>)
          }


          const {text}=this.state
          return (

            <div className="Addcenter">
            
            <h2 className="md-2  Headtitle " >Home Away from Home</h2>
            <h4 className="Headtitle"> Book your student accommodation near top universities across the globe.</h4>
            <input onFocus={this.myfocus} onBlur={this.myblur} onKeyDown={this.KeyControls} placeholder="Search by college or city" value={this.state.text} className="CityInput  md-2    input-group " type="text" onChange={this.search}  />
            {result}
            <div>
            {
              
              (this.state.searchData || this.state.text!==null )?
              this.state.searchData ?
              <div className="" >{
                this.state.searchData.map((item)=>
                  <div className="AutoSuggest" onClick={()=>this.suggestionSelect(item.name)} >
                  <i className="material-icons AutoSuggestloc">location_on</i>
                  {item.name} 
                  </div>)
              }
              </div>
               :

               ""
               

              :<div>
                 <div className="Deafultsearch"> </div>

              </div>

              
                
              







              }
              </div>  
              </div>
              )
            }
          }
          export default App ;