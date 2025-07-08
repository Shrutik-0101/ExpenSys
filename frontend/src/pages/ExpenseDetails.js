import React from 'react'

function ExpenseDetails({expenseAmt, totalCount }) {
    return (
        <div>
            <div className="amounts-container">
                Total Count
                <span className="details-count">{totalCount} Item/Items</span>
                Expense
                <span className="expense-amount">₹{expenseAmt}</span>
            </div>
        </div>
    )
}

export default ExpenseDetails