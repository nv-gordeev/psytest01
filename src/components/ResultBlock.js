import React from 'react'

export default ({result}) => (
    <div>
        <div className='col-12'>
            <table className="table">
                <tbody>
                    <tr>
                        <td>ФИО: </td>
                        <td>{result.person.fullName}</td>
                    </tr>
                    <tr>
                        <td>Дата рождения: </td>
                        <td>{result.person.birthDate}</td>
                    </tr>
                    <tr>
                        <td>Возраст: </td>
                        <td>{result.person.age}</td>
                    </tr>
                    <tr>
                        <td>Пол: </td>
                        <td>{result.person.gender === 'm'? "мужской" : "женский"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='col-12'>
            <p><strong>Общий балл: {result.total}</strong></p>
            <p><strong>Общий Т-показатель: {result.totalTIndex || 'не определен'} ({result.totalTIndexInterpretation || 'невозможно интерпретировать'})</strong></p>
            <p><strong>Данные по шкалам</strong></p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Шкала</th>
                        <th>Описание</th>
                        <th>Сумма баллов</th>
                        <th>Т-показатель</th>
                        <th>Интерпретация</th>
                    </tr>
                </thead>
                <tbody>
                    {result.scalesWithTIndex.map(scale => <tr key={scale.name}>
                        <td>{scale.name}</td>
                        <td>{`${scale.description} - ${scale.extendedDescription}`}</td>
                        <td>{scale.value}</td>
                        <td>{scale.tIndex || 'не определен'}</td>
                        <td>{scale.interpretation || 'невозможно интерпретировать'}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
)