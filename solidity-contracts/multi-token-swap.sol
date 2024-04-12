// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract MultiTokenSwap {
    // Struct to hold swap details
    struct SwapDetails {
        address partner;
        address[] tokens;
        uint256[] amounts;
        bool approved;
    }

    // Mapping to store swap details for each user
    mapping(address => SwapDetails) public swaps;

    event SwapInitiated(address indexed initiator, address indexed partner, address[] tokens, uint256[] amounts);
    event SwapApproved(address indexed approver, address indexed partner);
    event SwapExecuted(address indexed user1, address indexed user2, address[] tokensUser1, uint256[] amountsUser1, address[] tokensUser2, uint256[] amountsUser2);

    // Users can initiate or update a swap proposal
    function initiateOrUpdateSwap(
        address partner, 
        address[] calldata tokens, 
        uint256[] calldata amounts
    ) public {
        require(tokens.length == amounts.length, "Mismatch between tokens and amounts");
        require(tokens.length > 0, "No tokens specified");
        require(partner != address(0), "Invalid partner address");

        SwapDetails storage detail = swaps[msg.sender];
        detail.partner = partner;
        detail.tokens = tokens;
        detail.amounts = amounts;
        detail.approved = false;  // Reset approval on new initiation or update

        emit SwapInitiated(msg.sender, partner, tokens, amounts);
    }

    // Approve and execute the swap if both parties agree
    function approveSwap() public {
        SwapDetails storage detail = swaps[msg.sender];
        require(detail.tokens.length > 0, "No swap proposed");
        require(!detail.approved, "Swap already approved");

        // detail.approved = true;
        emit SwapApproved(msg.sender, detail.partner);

        // Check if the partner has also approved the swap
        SwapDetails storage partnerDetail = swaps[detail.partner];
        if (partnerDetail.approved && partnerDetail.partner == msg.sender) {
            executeSwap(msg.sender, detail.partner);
        }
    }

    function executeSwap(address user1, address user2) internal {
        SwapDetails storage detailsUser1 = swaps[user1];
        SwapDetails storage detailsUser2 = swaps[user2];

        // Ensure the swap is not executed prematurely
        require(detailsUser1.approved && detailsUser2.approved, "Both parties must approve the swap");
        require(detailsUser1.partner == user2 && detailsUser2.partner == user1, "Swap partners do not match");

        // Transfer tokens between the users
        for (uint i = 0; i < detailsUser1.tokens.length; i++) {
            require(IERC20(detailsUser1.tokens[i]).transferFrom(user1, user2, detailsUser1.amounts[i]), "Transfer failed for User 1's token");
        }
        for (uint i = 0; i < detailsUser2.tokens.length; i++) {
            require(IERC20(detailsUser2.tokens[i]).transferFrom(user2, user1, detailsUser2.amounts[i]), "Transfer failed for User 2's token");
        }

        // Clear the swap details to prevent re-execution
        delete swaps[user1];
        delete swaps[user2];

        emit SwapExecuted(user1, user2, detailsUser1.tokens, detailsUser1.amounts, detailsUser2.tokens, detailsUser2.amounts);
    }
}
