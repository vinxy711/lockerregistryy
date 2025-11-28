# License Registry – Smart Contract + Frontend Integration

## 📍 Contract Address  
**0xca932D4bd5e97771b8297AFe7518D85E509Efcd3**  
Explorer Link:  
https://coston2-explorer.flare.network/address/0xca932D4bd5e97771b8297AFe7518D85E509Efcd3

---

## 📘 Project Description  
This project is a **License Registry System** built on the **Flare Network (Coston2 Testnet)**.  
It allows an owner to:

- Issue licenses to any address  
- Revoke licenses  
- Update metadata  
- Verify whether a license is valid  
- Fetch license details  

A simple UI (Next.js + Wagmi + Viem) is included to interact with the contract.

---

## ⚙️ What the Project Does  
- Stores licenses on-chain using a `keccak256(id)` mapping.  
- Ensures licenses are tamper-proof and transparent.  
- Enables anyone to check license validity.  
- Supports dynamic metadata updates (IPFS/JSON).  
- Integrates with a frontend for issuing + revoking.

---

## ⭐ Features  
### 🔐 Owner Controls  
- Issue license  
- Revoke license  
- Transfer ownership  
- Update license metadata  

### 🔎 Public Features  
- Check license validity  
- Fetch complete license details

### 🌐 Frontend Features  
- Wallet connection  
- Issue license from UI  
- Revoke license  
- View transaction status  
- Error handling + loading UI  

---

## 🚀 How It Solves Problems  
Traditional license systems rely on centralized databases, which are:

- Easy to tamper  
- Hard to audit  
- Prone to single-point failures  

This on-chain License Registry solves these problems by:

### ✔ Storing all licenses transparently on blockchain  
### ✔ Providing trustless verification  
### ✔ Allowing easy integration with any app  
### ✔ Offering automated proof of authenticity  
### ✔ Removing the need for centralized storage  

---

## 📦 Smart Contract Code  
```solidity
//paste your code