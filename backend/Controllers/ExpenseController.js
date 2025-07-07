const UserModel = require("../Models/User");

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    console.log(_id, req.body)
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $push: { expenses: req.body } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense Added Successfully",
                success: true,
                data: userData?.expenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: err,
            success: false
        })
    }
}

const getAllTransactions = async (req, res) => {
    const { _id } = req.user;
    console.log(_id, req.body)
    try {
        const userData = await UserModel.findById(_id).select('expenses');
        res.status(200)
            .json({
                message: "Fetched Expenses Successfully",
                success: true,
                data: userData?.expenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: err,
            success: false
        })
    }
}

const deleteTransaction = async (req, res) => {
    const { _id } = req.user;
    const expenseId = req.params.expenseId;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true } // For Returning the updated documents
        )
        res.status(200)
            .json({
                message: "Expense Deleted Successfully",
                success: true,
                data: userData?.expenses
            })
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: err,
            success: false
        })
    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction
}