import React, { useState } from 'react'
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {

    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
        date: '',
        note: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }

    const addExpenses = (e) => {
        e.preventDefault();
        let { amount, text , date, note} = expenseInfo;
        if (!amount || !text || !date ) {
            handleError('Please add Expense Details');
            return;
        }
        amount = amount > 0 ? -Math.abs(amount) : amount;
        addTransaction({ amount, text, date, note });
        setExpenseInfo({ amount: '', text: '', date: '', note: '' });
    }

    return (
        <div className='container'>
            <h1>Tracker</h1>
            <form onSubmit={addExpenses}>
                <div>
                    <label htmlFor='text'>Expense Detail</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter your Expense Detail...'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        onChange={handleChange}
                        type='date'
                        name='date'
                        value={expenseInfo.date}
                    />
                </div>
                <div>
                    <label htmlFor="note">Notes</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='note'
                        placeholder="Add a note..."
                        value={expenseInfo.note}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter your Amount...'
                        value={expenseInfo.amount}
                    />
                </div>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm