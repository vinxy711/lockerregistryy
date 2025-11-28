// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title LicenseRegistry
 * @dev Simple beginner-friendly license registry smart contract.
 * - No constructor inputs required (owner is deployer)
 * - Owner can issue and revoke licenses
 * - Anyone can verify license validity and view basic info
 */
contract LicenseRegistry {
    address public owner;

    struct License {
        address holder;      // address that holds the license
        string id;           // human-readable license ID
        uint256 issuedAt;    // timestamp when issued
        bool valid;          // whether the license is currently valid
        string metadata;     // optional metadata (JSON, IPFS hash, etc.)
    }

    // Mapping from keccak256(id) => License
    mapping(bytes32 => License) private licenses;

    // Events
    event LicenseIssued(bytes32 indexed key, string id, address indexed holder);
    event LicenseRevoked(bytes32 indexed key, string id);
    event OwnerTransferred(address indexed oldOwner, address indexed newOwner);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        // No inputs — deployer becomes owner
        owner = msg.sender;
    }

    /// @notice Issue a license identified by `id` to `holder` with optional `metadata`
    /// @dev Uses keccak256(id) as the storage key to keep id as a string in struct too
    function issueLicense(string calldata id, address holder, string calldata metadata) external onlyOwner {
        bytes32 key = keccak256(abi.encodePacked(id));
        License storage lic = licenses[key];
        lic.holder = holder;
        lic.id = id;
        lic.issuedAt = block.timestamp;
        lic.valid = true;
        lic.metadata = metadata;

        emit LicenseIssued(key, id, holder);
    }

    /// @notice Revoke an existing license by id
    function revokeLicense(string calldata id) external onlyOwner {
        bytes32 key = keccak256(abi.encodePacked(id));
        require(licenses[key].issuedAt != 0, "License not found");
        licenses[key].valid = false;

        emit LicenseRevoked(key, id);
    }

    /// @notice Check whether a license is currently valid
    function isValid(string calldata id) external view returns (bool) {
        bytes32 key = keccak256(abi.encodePacked(id));
        return licenses[key].valid;
    }

    /// @notice Get full license details (holder, id, issuedAt, valid, metadata)
    function getLicense(string calldata id) external view returns (address holder, string memory licenseId, uint256 issuedAt, bool valid, string memory metadata) {
        bytes32 key = keccak256(abi.encodePacked(id));
        License storage lic = licenses[key];
        require(lic.issuedAt != 0, "License not found");
        return (lic.holder, lic.id, lic.issuedAt, lic.valid, lic.metadata);
    }

    /// @notice Transfer ownership to a new owner
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        address old = owner;
        owner = newOwner;
        emit OwnerTransferred(old, newOwner);
    }

    /// @notice Allow the owner to update metadata for an existing license
    function updateMetadata(string calldata id, string calldata metadata) external onlyOwner {
        bytes32 key = keccak256(abi.encodePacked(id));
        require(licenses[key].issuedAt != 0, "License not found");
        licenses[key].metadata = metadata;
    }
}
