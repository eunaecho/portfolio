import React, { Component } from "react";
import Ball from './Ball';

function getWinNumbers() {
    console.log('WinNumbers');
    const candidate = Array(45).fill().map((v, i) => i +1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p-c);
    return [...winNumbers, bonusNumber];
}

class lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    };

    timeouts = [];

    getBalls = () => {
        const { winNumbers } = this.state;
        for (let i=0; i<winNumbers.length - 1 ; i++) {
            this.timeouts[i] = setTimeout(() => {
                 this.setState( (prevState) => {
                     return {
                         winBalls : [...prevState.winBalls, winNumbers[i]]
                     };
                 });
            }, (i + 1) * 1000);
        }
        //bonus 공
        this.timeouts[6] = setTimeout( () => {
            this.setState( {
                bonus: winNumbers[6],
                redo:true,          //redo가 true가 되면 한 번더 버튼이 보인다
            });
        }, 7000)
    }

    componentDidMount() {
        console.log('didMount :: ');
        this.getBalls();
    }

    componentWillUnmount() {
        console.log('componentWillUnmount :: ');

        this.timeouts.forEach( () =>{
            clearTimeout(v);
        })
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate :: ');

        if (this.state.winBalls.length === 0) {
            this.getBalls();
        }
    };

    onClickRedo = () => {
        console.log('onClickRedo :: ');

        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = []
    };

    render () {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number = {v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default lotto;