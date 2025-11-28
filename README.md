# 🔐 License Registry – Simple Solidity License Management

A beginner-friendly **Solidity smart contract** that allows issuing, revoking, and verifying digital licenses on the blockchain.  
This project is perfect for learning **Solidity**, **events**, **modifiers**, and **mapping-based registries**.

---

## 🚀 Project Description

**LicenseRegistry** is a simple, easy-to-understand smart contract for managing licenses on-chain.  
It allows a contract owner to:

- Issue licenses to addresses  
- Revoke previously issued licenses  
- Update metadata  
- Transfer ownership  

Anyone can verify license validity or retrieve full license details.

This project is designed for **students, hackathon participants, and Web3 beginners** who want to understand how real-world registries are built using Solidity.

---

## 🧠 What It Does

- Stores licenses using a unique `id`
- Keeps holder address, timestamp, validity, and metadata
- Uses `keccak256(id)` to ensure efficient storage
- Emits events for issue/revoke/ownership transfer
- Makes validation and verification public

In short:  
**It works like a blockchain-powered license/ID manager.**

---

## ✨ Features

### ✔ Owner-Only Functions
- Issue a new license  
- Revoke a license  
- Update license metadata  
- Transfer contract ownership  

### ✔ Public Functions
- Check if a license is valid  
- Get full license details (holder, issuedAt, id, metadata)

### ✔ Beginner-Friendly Design
- No constructor parameters  
- Clean data structures  
- Gas-efficient mapping (hash → struct)  
- Clear events for frontend integrations  

---

## 📜 Deployed Smart Contract

**Transaction Hash:**  
`0x306b50ba8c8b98524154f78a82617ceb5502de4bc91116867140275fc2466df8`

**Deployed Contract Link:**  
👉 **XXX**  
(Replace this later with your actual block explorer URL)

---

## 🧩 Smart Contract Code

```solidity
//paste your code# lockerregistryy
=======


>>>>>>> 079ad5cb (Initial commit: pushed entire project)
