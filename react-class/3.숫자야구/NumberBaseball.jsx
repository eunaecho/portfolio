import React, { Component, createRef }  from 'react';
import Try from './Try';

function getNumbers() {     //숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i=0; i<4; i+=1 ) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    };

    onSubmitForm = (e) => {
        const { result, value, state, tries } = this.state;
        e.preventDefault();
        if (value === this.state.answer.join('')){
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: value, result: '홈런!'}]
                    }
            })
            alert('게임을 다시 시작');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {     //10번 이상 실패
                this.setState({
                    result: "실패 10번이상, 답은 ${answer.join(',')} 였습니다",
                });
                alert('게임을 다시 시작');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {       // 10번이내 실패
                for( let i=0; i<4; i+=1 ) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {   
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}],
                        value: '',
                    }
                });
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value
        });
    };

    inputRef = createRef();
    
    render() {
        return (
            <>
                <h1> {this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도 : {this.state.tries.length} </div>
                <ul>
                    {/* 즉시실행함수 */}
                    {(() => {
                        const array = []
                        for (let i=0; i<tries.length; i++) {
                            array.push( <Try key={`${i + 1}차 시도 : `} tryInfo={v}/>);
                        }
                        return array;
                    })()}
                    {/* {this.state.tries.map((v,i) => { 
                        return (
                           <Try key={`${i + 1}차 시도 : `} tryInfo={v}/>
                        );
                    })} */}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;
