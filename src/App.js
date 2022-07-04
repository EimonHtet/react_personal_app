//Import data from quiz.js in App.js 
import React from 'react';
import './App.css';
import getQuiz from './data/quiz' // add this new line
import logo from './logo.svg' // add this new line

class NavBar extends React.Component{
    render(){
        const menuItems= [
            {
                title:"Home",
                to: '/'
            },
            {
                title: "Search",
                subMenu: [
                    {
                        title:"Linear Search",
                        to: '/search/linear'
                    },
                    {
                        title:"Binary Search",
                        to: '/search/binary'
                    }
                ],
            },
            {
                title: "About",
                subMenu: [
                    {
                        title: "Who we are",
                        to: '/'
                    },
                    {
                        title: "Our values",
                        to: '/'
                    }
                ],
            },
        ];
        return (
          <nav>
            <ul className="Menu">
              {menuItems.map((item,index) => {
                return(
                <li className='menuItem' key={index}>
                  {
                    item.to ? (
                      <a href={item.to}>{item.title}</a>
                    ) : item.title
                  }
                  {item.subMenu ? (
                    <ul className='subMenu'>
                      {item.subMenu.map((sub, index) => {
                        return (
                          <li key={index} className="subItem">
                            <a href={sub.to}>{sub.title}</a>
                          </li>
                        )
                      })}
                    </ul>
                  ) : ''} 
                </li>
                );
                })
              }
            </ul>
          </nav>
        )
    }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeView:'quizOverView',
      quiz:getQuiz(),
      answer:[]
    }
    this.withoutParam = this.withoutParam.bind(this);// add this line to bind 'this'
  }
  // below the constructor
  withoutParam() {
  console.log('Testing')
  console.log(this.state)
  }
  submitAnswer(ans){
    console.log(ans)
    ans.status=1
    this.setState((prevState)=> {
      return {
        'buttonsDisabled':true,
        'answers':Object.assign({[this.state.currentQuestionIndex]:ans},prevState.answers)
      }
    })
    let app=this
    setTimeout(function()
    {
      let nextIndex=app.state.currentQuestionIndex+1
       let hasMoreQuestions= nextIndex < app.state.quiz.numOfQuestions
      console.log(nextIndex)
      if(hasMoreQuestions){
        app.showQuizQuestions(nextIndex)
      }
      else {
        // this.setState(()=>{
        //   return {activeView:'quizOverView'}
        app.showResults()
        }
      }, app.state.transitionDelay);
    
    
  }
  showResults() {
    this.setState((prevState) =>{
      return {
        activeView: 'quizResults'
      }
    })
    console.log(this.state.quiz.questions.answers)
  }
  showQuizQuestions(index) {
    this.setState(() => {
      //console.log("setting")
      console.log(index)
      return {
        'currentQuestionIndex': index,
        'activeView': 'quizQuestions',
        'buttonsDisabled':false,
      }
    });
    console.log(this.state.answer[0])
  } 

  render() {
    let question=this.state.quiz.questions[this.state.currentQuestionIndex]
    
    return (
      <div className="App">
        <NavBar />
        {this.state.activeView ==='quizOverView' && (
          <section className='overviewSection' style={{ display: 'flex',flexDirection:'column', justifyContent: 'center',alignItems:'center' }}>
            <div className='imageWrapper' >
              <img src={logo} alt="banner" className='banner' width="100" height="100" />
            </div>
            <div className='description'>
              {this.state.quiz.introduction}
            </div>
            
            <button style={{
              marginTop: '8px', padding: '8px',
              cursor: 'pointer', background: 'rgb(203, 179, 220)',
              fontSize: '20px'
              }}
              onClick={this.withoutParam}
              >
              Let Test Function
            </button>
            <button style={{
              marginTop: '8px', padding: '8px',
              cursor: 'pointer', background: 'rgb(203, 179, 220)',
              fontSize: '20px'
              }}
              onClick={()=>this.withoutParam()}
              >
              Let Test Arrow
            </button>
        
            <button style={{
              marginTop: '8px', padding: '8px',
              cursor: 'pointer', background: 'rgb(203, 179, 220)',
              fontSize: '20px'
              }}
              onClick={this.withoutParam.bind(this)}
              >
              Let Test (Arrow)
            </button>
    
            <button style={{
              marginTop: '8px', padding: '8px',
              cursor: 'pointer', background: 'rgb(203, 179, 220)',
              fontSize: '20px'
              }}
              onClick={this.showQuizQuestions.bind(this,0)}
              >
              Let Test (Bind in Render)
            </button>
          </section> 
          )
        }
        
        
       {this.state.activeView==="quizQuestions" &&
        ( 
          <section className='questionSection'>
            <div className="question">
            
              {question.question}
            </div>
            <div className="answers">
              {
                question.answers.map((ans,i) => (
                  <p key={i}>
                    <button className="ans_button" onClick={()=>this.submitAnswer(ans)} disabled={this.state.buttonsDisabled}>{ans.ur_answer}</button>
                  </p>
                )
                )
              }
            
            
            </div>
          </section>
        
        )
        }

        {this.state.activeView==="quizResults" &&
          (
            this.state.quiz.questions.map((question,id) => {
              return(
                <div key={id} >{question.question}
                
                {question.answers.map((ans,i) => (
                  <div key={i}>
                    {ans.status===1?
                    (i+1 === question.correct ?(<p style={{color:'green'}}>✔️ {ans.ur_answer}</p>):(<p style={{color:'red'}}>❌{ans.ur_answer}</p>))

                    :(<p>{ans.ur_answer}</p>)}
                  </div>
                )
                   
             ) }
             <p style={{color:'green'}}>{question.explanation}</p>
              <hr/>
            </div>
              )

            }
            )
            
          
          )   
          
        }
        
        
      </div>
    );
  }
}
export default App;