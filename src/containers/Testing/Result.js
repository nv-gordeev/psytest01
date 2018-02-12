import React, { Component } from 'react';
import withRouter from "react-router-dom/es/withRouter";
import {connect} from "react-redux";
import {ROUTES} from "../../constants/routes";
import {loadTMatrix} from "../../actions/testing";

class Result extends Component {

    componentWillMount() {
        if (!this.props.testing.person) {
            return this.props.history.push(ROUTES.ROOT)
        }
        this.props.loadTMatrix()
    }

    getAgeRange = (age) => {
        if (age >= 7 && age <=12)
            return '7_12'
        if (age >= 13 && age <=17)
            return '13_17'
        return null
    }

    getInterpretation = (tIndex) => {
        if (tIndex > 70) return 'Очень значительно превышает средний'
        if (tIndex >= 66 && tIndex < 70) return 'Значительно выше среднего'
        if (tIndex >= 61 && tIndex < 65) return 'Выше среднего'
        if (tIndex >= 56 && tIndex < 60) return 'Чуть выше среднего'
        if (tIndex >= 45 && tIndex < 55) return 'Средний'
        if (tIndex >= 40 && tIndex < 44) return 'Чуть ниже среднего'
        if (tIndex >= 35 && tIndex < 39) return 'Ниже среднего'
        if (tIndex >= 30 && tIndex < 34) return 'Много ниже среднего'
        if (tIndex < 30) return 'Значительно ниже среднего'
        return ''
    }

    render() {
        const {person, tMatrix} = this.props.testing
        if (!person) return <div>нет данных</div>
        if (!tMatrix) return <div>Загружается Т-матрица</div>
        const {age} = person
        const ageRange = this.getAgeRange(age)
        const totalTIndex =  ageRange && tMatrix[`total_${person.gender}_${ageRange}`][this.props.testing.total]
        const totalTIndexInterpretation =  totalTIndex && this.getInterpretation(totalTIndex)
        const scalesWithTIndex = Object.keys(this.props.testing.scales).map(k => {
            const tIndex = ageRange && tMatrix[`scale_${k.toLowerCase()}_${person.gender}_${ageRange}`][this.props.testing.scales[k]]
            return {
                name: k,
                value: this.props.testing.scales[k],
                tIndex,
                interpretation: tIndex && this.getInterpretation(tIndex)
        }})
        return (
            <div className="row">
                <div className='col-12'>
                    <h2>Результат тестирования</h2>
                </div>
                <div className='col-12'>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>ФИО: </td>
                                <td>{person.fullName}</td>
                            </tr>
                            <tr>
                                <td>Дата рождения: </td>
                                <td>{person.birthDate}</td>
                            </tr>
                            <tr>
                                <td>Возраст: </td>
                                <td>{age}</td>
                            </tr>
                            <tr>
                                <td>Пол: </td>
                                <td>{person.gender === 'm'? "мужской" : "женский"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-12'>
                    <p><strong>Общий балл: {this.props.testing.total}</strong></p>
                    <p><strong>Общий Т-показатель: {totalTIndex || 'не определен'} ({totalTIndexInterpretation || 'невозможно интерпретировать'})</strong></p>
                    <p><strong>Данные по шкалам</strong></p>
                    {scalesWithTIndex.map(scale => <p key={scale.name}>
                        Шкала {scale.name}: {scale.value}, Т-показатель: {scale.tIndex || 'не определен'} ({scale.interpretation || 'невозможно интерпретировать'})
                    </p>)}
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        testing: state.testing,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadTMatrix: () => dispatch(loadTMatrix())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result))