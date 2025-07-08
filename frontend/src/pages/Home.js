import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';
import ExpenseForm from './ExpenseForm';
import UserProfile from './UserProfile';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(10000); 
    const [balance, setBalance] = useState(monthlyBudget);
    const [showEditBudget, setShowEditBudget] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('Logged In Successfully');
        handleSuccess('Logged Out Successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])

    useEffect(() => {
        const remaining = monthlyBudget - expenseAmt;
        setBalance(remaining);
    }, [monthlyBudget, expenseAmt]);


    const deleteExpens = async (id) => {
        try {
            const url = `${APIUrl}/expenses/${id}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
                method: "DELETE"
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    // const fetchExpenses = async () => {
    //     try {
    //         const url = `${APIUrl}/expenses`;
    //         const headers = {
    //             headers: {
    //                 'Authorization': localStorage.getItem('token')
    //             }
    //         }
    //         const response = await fetch(url, headers);
    //         if (response.status === 403) {
    //             localStorage.removeItem('token');
    //             navigate('/login');
    //             return
    //         }
    //         const result = await response.json();
    //         console.log('--result', result.data);
    //         setExpenses(result.data);
    //     } catch (err) {
    //         handleError(err);
    //     }
    // }
    const fetchExpenses = useCallback(async () => {
    try {
        const url = `${APIUrl}/expenses`;
        const headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
        const response = await fetch(url, headers);
        if (response.status === 403) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }
        const result = await response.json();
        console.log('--result', result.data);
        setExpenses(result.data);
    } catch (err) {
        handleError(err);
    }
    }, [navigate]);


    const addTransaction = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            console.log('--result', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const exportToJSON = () => {
        const blob = new Blob([JSON.stringify(expenses, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expenses.json';
        link.click();
    };

    const exportToCSV = () => {
        const headers = ['Text', 'Amount', 'Date', 'Note'];
        const rows = expenses.map(e => [
            `"${e.text}"`,
            e.amount,
            `"${e.date || ''}"`,
            `"${e.note || ''}"`
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');

        const blob = new Blob([csvContent], {
            type: 'text/csv',
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'expenses.csv';
        link.click();
    };

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);


    // return (
    //     <div>
    //         <div className='user-section'>
    //             <h2>Welcome {loggedInUser}</h2>
    //             <button onClick={handleLogout} className='normalpad'>Logout</button>
    //         </div>
    //         <ExpenseDetails
    //             incomeAmt={incomeAmt}
    //             expenseAmt={expenseAmt}
    //         />

    //         <ExpenseForm
    //             addTransaction={addTransaction} />

    //         <ExpenseTable
    //             expenses={expenses}
    //             deleteExpens={deleteExpens}
    //         />
    //         <ToastContainer />
    //     </div>
    // )
    return(
        <div className='home-page'>
            <h1 className="app-title home-title">ExpenSys</h1>
            <div className='user-section'>
                <h2>Welcome {loggedInUser} ✨</h2>
                <button onClick={handleLogout} className='normalpad'>Logout</button>
            </div>
            <UserProfile user={{
                name: loggedInUser,
                email: localStorage.getItem("email"),
                profileImage: localStorage.getItem("profileImage"),
                bio: "Budgeting every month like a boss"
            }} />
            <div className="budget-section">
                <div className="budget-bar-label">
                    Monthly Budget: ₹{monthlyBudget}
                    <button onClick={() => setShowEditBudget(!showEditBudget)}>Edit</button>
                </div>

                {showEditBudget && (
                    <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    />
                )}

                <div className="budget-bar-container">
                    <div
                    className="budget-bar-fill"
                    style={{
                        width: `${Math.min((expenseAmt / monthlyBudget) * 100, 100)}%`,
                        backgroundColor: expenseAmt >= monthlyBudget ? "#e74c3c" : "#27ae60"
                    }}
                    ></div>
                </div>

                <div className="budget-progress-text">
                    ₹{expenseAmt} spent of ₹{monthlyBudget}
                </div>
                <div className="budget-balance-text">
                    Balance: ₹{balance}
                </div>

            </div>
            <div className="export-buttons">
                <button onClick={exportToJSON}>📥 Export JSON</button>
                <button onClick={exportToCSV}>📥 Export CSV</button>
            </div>
            <ExpenseDetails
                expenseAmt={expenseAmt}
                totalCount={expenses.length}
            />

            <div className="home-layout">
                <div className="left-panel">
                <ExpenseForm addTransaction={addTransaction} />
                </div>

                <div className="right-panel">
                <ExpenseTable
                    expenses={expenses}
                    deleteExpens={deleteExpens}
                />
                </div>
            </div>

            <ToastContainer />
        </div>

    )
}



export default Home