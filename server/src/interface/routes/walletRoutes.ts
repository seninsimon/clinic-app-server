// routes/walletRoutes.ts (or similar)
import express from "express";
import { TransactionRepositoryImpl } from "../../infrartucture/repositories/TransactionRepoImp";
import { TransactionHistory } from "../../application/usecases/admin/TransactionHistory";
import { WalletController } from "../controller/WalletController";
import { WalletRepositoryImpl } from "../../infrartucture/repositories/WalletRepoImp";
import { GetWalletBalance } from "../../application/usecases/admin/Wallet";

const router = express.Router();

const transactionRepo = new TransactionRepositoryImpl();
const walletRepo = new WalletRepositoryImpl()


// use case
const transactionHistory = new TransactionHistory(transactionRepo);
const walletBalance = new GetWalletBalance(walletRepo)

// controller
const walletController = new WalletController(transactionHistory , walletBalance);

router.get("/admin/transaction-history", (req, res) => walletController.getAdminTransactions(req, res));
router.get("/admin/wallet-balance", (req, res) => walletController.getAdminBalance(req, res));

export { router as transactionRouter};
