import React from 'react';

// const ExpenseTable = ({ expenses, deleteExpens }) => {

//     return (
//         <div className="expense-list">
//             {expenses.map((expense, index) => (
//                 <div key={index} className="expense-item">
//                     <button className="delete-button" onClick={() =>
//                         deleteExpens(expense._id)}>X</button>
//                     <div className="expense-description">
//                         {expense.text}
//                         {expense.date && <div className="expense-date"> {expense.date}</div>}
//                         {expense.note && <div className="expense-note"> {expense.note}</div>}
//                     </div>
//                     <div 
//                         className="expense-amount"
//                         style={{ color: expense.amount > 0 ? '#27ae60' : '#c0392b' }}
//                     >₹{expense.amount} ✨</div>
//                 </div>
//             ))}
//         </div>
//     );
// };

const ExpenseTable = ({ expenses, deleteExpens }) => {
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div key={expense._id} className="expense-item">
          <div className="expense-top">
            <div className="expense-description">
              <div className="expense-text">{expense.text}</div>

              {expense.date && (
                <div className="expense-date">
                    📅 {new Date(expense.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                    })}
                </div>
            )}
              {expense.note && (
                <div className="expense-note">📝 {expense.note}</div>
              )}
            </div>

            <div
              className="expense-amount"
              style={{
                color: expense.amount > 0 ? '#27ae60' : '#c0392b'
              }}
            >
              ₹{expense.amount}
            </div>
          </div>

          <button
            className="delete-button"
            onClick={() => deleteExpens(expense._id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};


export default ExpenseTable;
